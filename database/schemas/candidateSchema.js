const mongoose = require("mongoose");


const candidateSchema = new mongoose.Schema({
    candName: String,
    candContact: Number,
    candemail: String,
})

module.exports = mongoose.model("CandidateDB", candidateSchema);