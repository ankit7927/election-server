const mongoose = require("mongoose");

const electionSchema = new mongoose.Schema({
  electionName: {
    type: String,
    required: true,
  },
  // important dates
  nominationStart: Date,
  nominationEnd: Date,
  votingStart: Date,
  votingEnd: Date,
  image: String,
  //craiteria of voting
  craiteria: {
    state: String,
    birthDate: Date,
  },
  nominatedCandidates: [
    {
      candidatesID: String,
      voteCount: Number,
      _id: false,
    },
  ],
  registredVoters: [
    {
      voterID: String,
      _id: false,
    },
  ],
  _v: false,
});

module.exports = mongoose.model("electionSchema", electionSchema);
