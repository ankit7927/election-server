const mongoose = require("mongoose");

const voterSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    username: {
        type: String,
        unique: true,
        requred: true
    },
    password: {
        type: String,
        requred: true
    },
    profileImage: String,
    // id details
    birthDate: Date,
    address: String,
    state: String,
    adharNo: Number,
    panNo: String,
})

module.exports = mongoose.model("Voters", voterSchema);