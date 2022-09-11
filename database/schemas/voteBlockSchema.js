const mongoose = require("mongoose");
const { candidateSchema } = require("./candidateSchema")
const voteBlockSchema = new mongoose.Schema({
    blockHash: String,
    previousHash: String,
    timeStamp: Date,
    voterID: String,
    electionID: String,
    votes: [
        {
            candidate: candidateSchema,
            voteCount: {
                type: Number,
                default: 0
            },
            _id: false
        }
    ],
})

module.exports = mongoose.model("Blocks", voteBlockSchema);