const mongoose = require("mongoose");


const candidateSchema = new mongoose.Schema({
    candName: String,
    candContact: Number,
    candEmail: String,
})

module.exports = mongoose.model("Candidates", candidateSchema);