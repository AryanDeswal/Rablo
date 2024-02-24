// Generates a random numeric One Time Password (OTP) of specified length.
function generateOTP(otpLength) {
    const chars = '0123456789';
    let OTP = '';
    for (let i = 0; i < otpLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        OTP += chars[randomIndex];
    }
    return OTP;
}

module.exports = { generateOTP };