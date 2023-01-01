const electionSchema = require("../database/schemas/electionSchema");
const voteBlockSchema = require("../database/schemas/voteBlockSchema");


const getAllElection = (req, res) => {
  electionSchema.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.send(data);
    }
  });
};

const getOnGoingElection = (req, res) => {
  electionSchema.find({}, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      console.log(data)
      temparray = [];
      const currentDate = new Date();
      data.forEach((element) => {
        if (
          new Date(element.votingStart) < currentDate &&
          currentDate < new Date(element.votingEnd)
        ) {
          temparray.push(element);
        }

      });
      return res.send(temparray);
    }
  });
};

const getElectionByID = (req, res) => {
  electionSchema.findById({ _id: req.params.id }, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.send(data);
    }
  });
};

const getAllCandidateOfElection = (req, res) => {
  electionSchema.findById(
    { _id: req.params.electionID },
    { nominatedCandidates: 1 },
    (err, data) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.send(data);
      }
    }
  );
};


// get all vote blocks
const getAllBlocks = (req, res) => {
  voteBlockSchema.find({}, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(data);
    }
  })
}

// get election block
const getBlockOfElection = (req, res) => {
  voteBlockSchema.find({ electionID: req.params.eleID }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(data);
    }
  })
}



module.exports = {
  getAllElection,
  getAllCandidateOfElection,
  getOnGoingElection,
  getElectionByID,
  getBlockOfElection,
  getAllBlocks,
};
