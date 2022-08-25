var express = require("express");
var router = express.Router();
const voterAuth = require("../authentication/voterAuth");

const {
  voterSignUp,
  updateVoter,
  voterLogin,
  voterProfile,
} = require("../services/voterService");

router.post("/voter-signup", (req, res) => {
  voterSignUp(req, res);
});

router.put("/voter-update/:voterid", voterAuth, (req, res) => {
  updateVoter(req, res);
});

router.post("/voter-login", (req, res) => {
  voterLogin(req, res);
});

router.get("/voter-profile/:voterID", voterAuth, (req, res) => {
  voterProfile(req, res);
});

module.exports = router;
