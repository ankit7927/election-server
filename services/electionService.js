const electionSchema = require("../database/schemas/electionSchema");

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

module.exports = {
  getAllElection,
  getAllCandidateOfElection,
  getOnGoingElection,
  getElectionByID,
};
