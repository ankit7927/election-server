const electionSchema = require("../database/schemas/electionSchema");
const { candidateModel } = require("../database/schemas/candidateSchema");
const voterSchema = require("../database/schemas/voterSchema");
const voteBlockSchema = require("../database/schemas/voteBlockSchema");
const adminSchema = require("../database/schemas/adminSchema");
const imagesSchema = require("../database/schemas/imagesSchema");

const getToken = require("../authentication/JWTOperations");

// create new election
const createNewElection = (req, res) => {
  const { electionName, electionDec, voteStart, voteEnd, state } = req.body;
  console.log(req.file);
  const newElection = new electionSchema({
    electionName: electionName,
    electionDec: electionDec,
    votingStart: voteStart,
    votingEnd: voteEnd,
    "craiteria.state": state,
  });
  newElection.save((err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send("election added");
    }
  });
};

// delete election
const deteletElection = (req, res) => {
  const eleID = req.params.eleID
  electionSchema.findOneAndDelete({ _id: eleID }, (err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send("election deleted");
    }
  })
}


// create new candidate
const createCandidate = (req, res) => {
  const { name, contact, email, party } = req.body;

  const newCandidate = new candidateModel({
    candName: name,
    candContact: contact,
    candEmail: email,
    candParty: party
  });

  // saving new candidate
  newCandidate.save((err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send("candidate added");
    }
  });
};

// get all candidate
const getAllCandidate = (req, res) => {
  candidateModel.find({}, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(data);
    }
  })
}

// add candidates to election
const registerCandidate = (req, res) => {
  const { candID, eleID } = req.body

  candidateModel.findById({ _id: candID }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      electionSchema.findOneAndUpdate({ _id: eleID }, {
        "$push": {
          nominatedCandidates: {
            candidate: data
          }
        }
      }, (err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          return res.status(200).send("candidate registred");
        }
      })
    }
  })
}

// genises block 
const genisesBlock = async (req, res) => {
  const eleID = req.params.eleID
  election = {}
  try {
    election = await electionSchema.findById(
      { _id: eleID },
      { nominatedCandidates: 1 }
    )
  } catch (error) {
    return res.status(400).send("wrong election ID\n" + error);
  }

  if (election.nominatedCandidates === []) {
    return res.status(400).send("no candidates are nominated please\nnominante candidates");
  }

  const temp = await voteBlockSchema.find({ electionID: eleID }).count()
  if (temp < 1) {
    const newBlock = new voteBlockSchema({
      blockHash: "this genises block",
      previousHash: "this genises block",
      timeStamp: new Date(),
      electionID: eleID,
      votes: election.nominatedCandidates
    })
    newBlock.save((err, data) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send(data);
      }
    })
  } else {
    return res.status(400).send("genises block is alrady created -");
  }
}

// get all voters
const getAllVoters = (req, res) => {
  voterSchema.find({}, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
};

// register voter
const registerVoter = async (req, res) => {
  try {
    const elecCratia = await electionSchema.findById(
      { _id: req.params.eleID },
      { craiteria: 1 }
    );
    const voters = await voterSchema.find({ state: elecCratia.craiteria.state }, { _id: 1 })
    tempArray = []
    voters.map((voter) => tempArray.push(voter._id))

    electionSchema.findByIdAndUpdate({ _id: req.params.eleID }, {
      "$set": {
        registredVoters: tempArray
      }
    }, (err, data) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send("voters redistered");
      }
    })
  } catch (error) {
    return res.status(500).send(error);
  }
};

// unregister voter
const removeVoter = (voterID, eleID, candState, res) => {
  electionSchema.findById({ _id: eleID }, { registredVoters: 1 }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      for (var i = 0; i <= data.registredVoters.length; i++) {
        if (data.registredVoters[i] == voterID) {
          data.registredVoters.splice(i, 1)
        }
      }

      electionSchema.findByIdAndUpdate({ _id: eleID }, {
        "$set": {
          registredVoters: data.registredVoters,
          nominatedCandidates: candState
        }
      }, (err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          return res.status(200).send("votted success");
        }
      })
    }
  })
}

// signup admin
const signupAdmin = (req, res) => {
  const { name, email, username, password } = req.body;
  newAdmin = new adminSchema({
    name: name,
    email: email,
    username: username,
    password: password,
  });

  newAdmin.save((err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).json({ token: getToken(data._id, "admin") });
    }
  });
};

// admin login
const loginAdmin = (req, res) => {
  const { username, password } = req.body;
  adminSchema.findOne(
    { username: username, password: password },
    (err, data) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).json({ token: getToken(data._id, "admin") });
      }
    }
  );
};

// add image
const addImages = (req, res) => {
  const { imageName, imageDec } = req.body;
  const newImage = new imagesSchema({
    imageName: imageName,
    imageDec: imageDec,
    imageUrl: req.file.destination + "/" + req.file.originalname,
  });
  newImage.save((err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send("image uploaded");
    }
  });
};

// get image
const getImages = (req, res) => {
  const imageName = req.params.imageName;
  imagesSchema.find({ imageName: imageName }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
};

module.exports = {
  createNewElection,
  deteletElection,
  createCandidate,
  registerCandidate,
  removeVoter,
  getAllCandidate,
  genisesBlock,
  getAllVoters,
  registerVoter,
  signupAdmin,
  loginAdmin,
  addImages,
  getImages,
};
