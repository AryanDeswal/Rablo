const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    DateOfBirth: String,
    Gender: String,
    mobileNumber: String,
    guardianNumber: String,
    houseNo: String,
    city: String,
    state: String,
    pinCode: String,
    referalCode: String,
    school: String,
    class: String,
    Boards: String,
    subjectYouStudy: [String]
})

const User = mongoose.model('user', userSchema);

module.exports = User;