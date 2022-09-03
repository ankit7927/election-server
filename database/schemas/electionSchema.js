const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  electionName: {
    type: String,
    required: true,
  },
  electionDec: String,
  // important dates
  votingStart: Date,
  votingEnd: Date,
  // tumbnail image
  image: String,
  //craiteria of voting
  craiteria: {
    state: String,
  },
  nominatedCandidates: [
    {
      candidateID: String,
      voteCount: {
        type: Number,
        default: 0
      },
      _id: false,
    },
  ],
  registredVoters: [
    String
  ],
  __v: false,
});

module.exports = mongoose.model("electionSchema", electionSchema);
