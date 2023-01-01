const voterSchema = require("../database/schemas/voterSchema");
const voteBlockSchema = require("../database/schemas/voteBlockSchema");
const getToken = require("../authentication/JWTOperations");
const electionSchema = require("../database/schemas/electionSchema");
const { removeVoter } = require("./adminService")
const generatHash = require("../extras/block")

// voters signup
const voterSignUp = (req, res) => {
  const { name, email, username, password } = req.body;

  const newVoter = new voterSchema({
    name: name,
    email: email,
    username: username,
    password: password,
  });
  newVoter.save((err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).json({ "token": getToken(data._id, "voter"), "voterID": data._id })
    }
  });
};

// voter login
const voterLogin = async (req, res) => {
  const { username, password } = req.body;

  const temp = await voterSchema.findOne({ username: username, password: password });
  if (temp != null) {
    return res.status(200).json({ "token": getToken(temp._id, "voter"), "voterID": temp._id })
  } else {
    return res.status(400).send("voter does not exixst");
  }
};

// voter update
const updateVoter = (req, res) => {
  _id = req.user._id;
  const {
    contact,
    email,
    address,
    adharNo,
    panNo,
    state,
    birthDate,
  } = req.body;

  voterSchema.findOneAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        state: state,
        birthDate: new Date(birthDate).toLocaleDateString(),
        contact: contact,
        email: email,
        address: address,
        adharNo: adharNo,
        panNo: panNo,
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
  voterSchema.findById({ _id: req.user._id }, (err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send(data);
    }
  });
};

// voter id confirmation
const voterConfirmation = (req, res) => {
  const { password } = req.body;
  const voterID = req.user._id
  /// we will obtain opt --

  voterSchema.findOne({ _id: voterID, password: password }, (err, data) => {
    if (data != null) {
      return res.status(200).json({ "info": "voter confirmed" })
    } else {
      return res.status(400).json({ "error": "voter not confirmed" + err });
    }
  });

}

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

  const { selectedCand, eleID } = req.body;
  const voterID = req.user._id
  const lastblock = await voteBlockSchema.find({ electionID: eleID }).limit(1).sort({ "$natural": -1 })

  lastblock[0].votes.map((vote) => {
    if (vote.candidate._id == selectedCand) {
      vote.voteCount = vote.voteCount + 1
    }
  })
  dateTime = new Date().toLocaleDateString();
  const newBlock = new voteBlockSchema({
    blockHash: generatHash({ eleID: eleID, dateTime: dateTime, votes: lastblock[0].votes }),
    previousHash: lastblock[0].blockHash,
    timeStamp: dateTime,
    electionID: eleID,
    votes: lastblock[0].votes
  })

  newBlock.save((err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      // here are removing voter id from 
      // this election database
      // and updating nominated candidate
      removeVoter(voterID, eleID, lastblock[0].votes, res)
    }
  })
}



/**
 * this is the middelwere to check
 * voter data is correct or not
 */
const voteMiddleWare = async (req, res, next) => {
  const { selectedCand, eleID } = req.body;
  const voterID = req.user._id
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
    if (cand.candidate._id == selectedCand) {
      candx = true
    }
  })
  election.registredVoters.map((voter) => {
    if (voter === voterID) {
      voterx = true
    }
  })

  if (candx && voterx) {
    next()
  } else {
    return res.status(400).json({ "error": "voter or candidate not found \n voter may voted or not listed" });
  }
}


// exports...
module.exports = {
  updateVoter,
  voterLogin,
  voterConfirmation,
  voterSignUp,
  voterProfile,
  vote,
  voteMiddleWare,
};
