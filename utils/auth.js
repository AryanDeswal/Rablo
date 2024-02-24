const twilio = require("twilio");

// Initialize Twilio client
const twilioClient = twilio(process.env.Account_SID, process.env.Auth_Token);

// Function to send OTP to the specified mobile number
async function sendOTP(mobileNumber, otp) {
    try {
        await twilioClient.messages.create({
            body: `Your Custom OTP is ${otp}`,
            to: mobileNumber,
            from: "+15632275369",
        });
        console.log(`Custom otp sent to ${mobileNumber}: ${otp}`);
        return true;
    } catch (err) {
        console.error("Error sending OTP:", err);
        return false;
    }
}

// Middleware function to verify OTP
function verifyOTP(enteredOTP, storedOTP) {
    if (enteredOTP && storedOTP && enteredOTP === storedOTP) {
        return true;
    } else {
        return false;
    }
}

module.exports = { sendOTP, verifyOTP };