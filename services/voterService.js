const voterSchema = require("../database/schemas/voterSchema");
const getToken = require("../authentication/JWTOperations");

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

// exports...
module.exports = {
  updateVoter,
  voterLogin,
  voterSignUp,
  voterProfile,
};
