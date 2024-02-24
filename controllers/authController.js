const User = require('../models/User');
const auth = require('../utils/auth');
const { generateOTP } = require('../utils/generateOTP');

async function post_Verify(req, res) {
    const { mobileNumber } = req.body;
    const otp = generateOTP(6);
    const isOtpSent = await auth.sendOTP(mobileNumber, otp);
    if (isOtpSent) {
        req.session.otp = otp;
        req.session.mobileNumber = mobileNumber;
        return res.status(200).json({ status: "OTP Sent Successfully" });
    }
    return res.status(500).json({ status: "Error Sending Otp" });
};

async function post_SignUp(req, res) {
    const userInfo = req.body;

    const isVerified = auth.verifyOTP(userInfo.otp, req.session.otp);

    if (!isVerified) {
        return res.status(500).json({ status: "Invalid OTP" });
    }

    // Clear OTP from session once verified
    delete req.session.otp;
    delete req.session.mobileNumber;

    // Create a new instance of the User model with each object
    const newUser = new User(userInfo);
    // Save the new User object to the database
    await newUser.save();

    return res.status(200).json({ status: "success" })
}

module.exports = { post_Verify, post_SignUp };