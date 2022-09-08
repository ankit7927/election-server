const mongoose = require("mongoose");
//const voteModel = require("./voteModel")

const voteBlockSchema = new mongoose.Schema({
    blockHash: String,
    previousHash: String,
    timeStamp: Date,
    voterID: String,
    electionID: String,
    votes: [
        {
            candidateID: String,
            candName: String,
            candEmail: String,
            voteCount: Number,
            _id: false
        }
    ],
})

module.exports = mongoose.model("voteBlockDB", voteBlockSchema);