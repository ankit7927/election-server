const mongoose = require("mongoose");


var candidateSchema = new mongoose.Schema({
    candName: String,
    candContact: Number,
    candEmail: String,
})

const candidateModel = mongoose.model("Candidates", candidateSchema);

module.exports = {
    candidateModel,
    candidateSchema,
}