const mongoose = require("mongoose");

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

module.exports = mongoose.model("Blocks", voteBlockSchema);