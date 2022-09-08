var express = require("express");
var router = express.Router();

const {
  getAllElection,
  getAllCandidateOfElection,
  getOnGoingElection,
  getElectionByID,
  getBlockOfElection,
  getAllBlocks,
} = require("../services/electionService");

const { getImages } = require("../services/adminService");

router.get("/current-ele", (req, res) => {
  getOnGoingElection(req, res);
});

router.get("/get-election/:id", (req, res) => {
  getElectionByID(req, res);
});

router.get("/all-cand/:electionID", (req, res) => {
  getAllCandidateOfElection(req, res);
});

router.get("/all-election", (req, res) => {
  getAllElection(req, res);
});

router.get("/get-images/:imageName", (req, res) => {
  getImages(req, res);
});

router.get("/get-blocks", (req, res) => {
  getAllBlocks(req, res);
});

router.get("/get-blocks/:eleID", (req, res) => {
  getBlockOfElection(req, res);
});


module.exports = router;
