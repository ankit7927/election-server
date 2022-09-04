var express = require("express");
var router = express.Router();
const voterAuth = require("../authentication/voterAuth");

const {
  voterSignUp,
  updateVoter,
  voterLogin,
  voterProfile,
  vote,
  voteMiddleWare,
  getAllBlocks,
  getBlockOfElection,
} = require("../services/voterService");

router.post("/voter-signup", (req, res) => {
  voterSignUp(req, res);
});

router.put("/voter-update/:voterid", (req, res) => {
  updateVoter(req, res);
});

router.post("/voter-login", (req, res) => {
  voterLogin(req, res);
});

router.get("/voter-profile/:voterID", (req, res) => {
  voterProfile(req, res);
});

router.post("/vote", voteMiddleWare, (req, res) => {
  vote(req, res);
});

router.get("/get-blocks", (req, res) => {
  getAllBlocks(req, res);
});

router.get("/get-blocks/:eleID", (req, res) => {
  getBlockOfElection(req, res);
});

module.exports = router;
