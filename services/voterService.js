const voterSchema = require("../database/schemas/voterSchema");
const voteBlockSchema = require("../database/schemas/voteBlockSchema");
const getToken = require("../authentication/JWTOperations");
const electionSchema = require("../database/schemas/electionSchema");

// voters signup
const voterSignUp = (req, res) => {
  const { name, contact, email, username, password } = req.body;

  const newVoter = new voterSchema({
    name: name,
    contact: contact,
    email: email,
    username: username,
    password: password,
  });
  console.log("reached")
  newVoter.save((err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send("voter added");
    }
  });
};

// voter login
const voterLogin = async (req, res) => {
  const { username, password } = req.body;
  const role = "voter";
  const temp = await voterSchema.exists({ username: username, password: password });
  if (temp != null) {
    return res.status(200).json({ "token": getToken(temp._id, role), "voterID": temp._id })
  } else {
    return res.status(400).send("voter does not exixst");
  }
};

// voter update
const updateVoter = (req, res) => {
  _id = req.params.voterid;
  const {
    contact,
    email,
    password,
    address,
    adharNo,
    panNo,
    voterID,
    state,
    birthDate,
  } = req.body;

  voterSchema.findOneAndUpdate(
    { _id: req.params.voterid },
    {
      $set: {
        state: state,
        birthDate: birthDate,
        contact: contact,
        email: email,
        password: password,
        address: address,
        adharNo: adharNo,
        panNo: panNo,
        voterID: voterID,
      },
    },
    (err) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).send("voter updated");
      }
    }
  );
};

// voter profile
const voterProfile = (req, res) => {
  voterSchema.findById({ _id: req.params.voterID }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
};

/**
 * ------blockchain simulation-----
 * creating block with its atributes and 
 * storing in database 
 * 
 * it is not real blockchain
 */

/**
 * vote block generator
 */
const vote = async (req, res) => {
  /**
   * 1. authenticate voter
   * 2. validate blocks
   * 3. add new block
   * 4. remove voter id from election
   * 
   * get all candidates id from electionSchema
   * which will be an array 
   */
  const { selectedCad, eleID } = req.body;
  const lastblock = await voteBlockSchema.find().limit(1).sort({ "$natural": -1 })

  const newBlock = new voteBlockSchema({
    blockHash: "this is some hash ",
    previousHash: "hash of previous hash",
    timeStamp: "2020-02-02",
    electionID: eleID,
    votes: lastblock.votes
  })

  res.send(newBlock)

}



/**
 * this is the middelwere to check
 * voter data is correct or not
 */
const voteMiddleWare = async (req, res, next) => {
  const { selectedCand, eleID, voterID } = req.body; //voterid*** will extracted from token
  candx = false
  voterx = false
  election = {}
  try {
    election = await electionSchema.findById(
      { _id: eleID },
      { nominatedCandidates: 1, registredVoters: 1 }
    )
  } catch (error) {
    return res.status(400).send("wrong election ID" + error);
  }

  election.nominatedCandidates.map((cand) => {
    if (cand.candidateID == selectedCand) {
      candx = true
    }
  })
  election.registredVoters.map((voter) => {
    if (voter == voterID) {
      voterx = true
    }
  })

  if (candx && voterx) {
    next()
  } else {
    return res.send("note done");
  }

}


const getAllBlocks = (req, res) => {
  voteBlockSchema.find({}, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(data);
    }
  })
}



// exports...
module.exports = {
  updateVoter,
  voterLogin,
  voterSignUp,
  voterProfile,
  vote,
  voteMiddleWare,
  getAllBlocks,
};
