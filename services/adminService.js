const electionSchema = require("../database/schemas/electionSchema");
const candidateSchema = require("../database/schemas/candidateSchema");
const voterSchema = require("../database/schemas/voterSchema");
const adminSchema = require("../database/schemas/adminSchema");
const imagesSchema = require("../database/schemas/imagesSchema");

const getToken = require("../authentication/JWTOperations");

// create new election
const createNewElection = (req, res) => {
  const { name, nomStart, nomEnd, voteStart, voteEnd, state, birthDate } =
    req.body;
  console.log(req.file);
  const newElection = new electionSchema({
    electionName: name,
    nominationStart: nomStart,
    nominationEnd: nomEnd,
    votingStart: voteStart,
    votingEnd: voteEnd,
    "craiteria.state": state,
    "craiteria.birthDate": birthDate,
    image: req.file.destination + "/" + req.file.originalname,
  });

  // saving new candidate
  newElection.save((err) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      return res.status(200).send("election added");
    }
  });
};

// create new candidate
const nominateCandidate = (req, res) => {
  const { name, contact, email, electionID } = req.body;

  const newCandidate = new candidateSchema({
    candName: name,
    candContact: contact,
    candemail: email,
    nominatingElectionID: electionID,
  });

  // saving new candidate
  newCandidate.save((err, data) => {
    if (err) {
      return res.status(400).send(err);
    } else {
      electionSchema.findByIdAndUpdate(
        { _id: electionID },
        {
          $push: {
            nominatedCandidates: {
              candidatesID: newCandidate._id,
            },
          },
        },
        (err, data) => {
          if (err) {
            return res.status(400).send(err);
          } else {
            return res.status(200).send("candidate added");
          }
        }
      );
    }
  });
};

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
    elecCratia = await electionSchema.findById(
      { _id: req.params.eleID },
      { craiteria: 1, _id: 0 }
    );

    voterSchema.updateMany(
      { state: elecCratia.craiteria.state },
      {
        $push: {
          voteValue: {
            eletionID: req.params.eleID,
          },
        },
      },
      (err) => {
        if (err) {
          return res.status(400).send(err);
        } else {
          return res.status(200).send("voters registred");
        }
      }
    );
  } catch (error) {
    return res.status(400).send(error);
  }
};

// unregister voters

// signup admin
const signupAdmin = (req, res) => {
  const { name, email, username, password } = req.body;
  newAdmin = new adminSchema({
    name: name,
    email: email,
    username: username,
    password: password,
  });
  try {
    newAdmin.save((err, data) => {
      if ((err, data)) {
        return res.status(400).send(err);
      } else {
        return res.status(200).json({ info: "admin added" });
      }
    });
  } catch (error) {}
};

// admin login
const loginAdmin = (req, res) => {
  const { username, password } = req.body;
  const role = "admin";
  adminSchema.findOne(
    { username: username, password: password },
    (err, data) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        return res.status(200).json({ token: getToken(data._id, role) });
      }
    }
  );
};

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
  nominateCandidate,
  getAllVoters,
  registerVoter,
  signupAdmin,
  loginAdmin,
  addImages,
  getImages,
};
