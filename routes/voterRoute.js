var express = require("express");
var router = express.Router();
const voterAuth = require("../authentication/voterAuth");

const {
  voterSignUp,
  updateVoter,
  voterLogin,
  voterConfirmation,
  voterProfile,
  vote,
  voteMiddleWare,
} = require("../services/voterService");

router.post("/voter-signup", (req, res) => {
  voterSignUp(req, res);
});

router.put("/voter-update", voterAuth, (req, res) => {
  updateVoter(req, res);
});

router.post("/voter-login", (req, res) => {
  voterLogin(req, res);
});

router.post("/voter-conf", voterAuth, (req, res) => {
  voterConfirmation(req, res);
});

router.get("/voter-profile", voterAuth, (req, res) => {
  voterProfile(req, res);
});

router.post("/vote", voterAuth, voteMiddleWare, (req, res) => {
  vote(req, res);
});


module.exports = router;
