const User = require('../models/User');
const auth = require('../utils/auth');
const { isValidObjectId } = require('mongoose');
const { generateOTP } = require('../utils/generateOTP');

async function get_userById(req, res) {
    const { id } = req.params;

    // Validate ObjectId format
    if (!isValidObjectId(id)) {
        return res.status(400).json({ status: "Invalid user ID" });
    }

    try {
        // Find user by ID
        const user = await User.findById(id);

        // If user not found, return 404
        if (!user) {
            return res.status(404).json({ status: "User not found" });
        }

        // Return user details
        return res.json({ data: user });
    } catch (err) {
        console.log("Error getting the Details:", err);
        res.status(500).json({ status: "Internal Server Error" });
    }
}

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

    return res.status(200).json({ userId: newUser._id });
}

module.exports = { get_userById, post_Verify, post_SignUp };