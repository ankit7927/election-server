var express = require("express");
var router = express.Router();
const adminAuth = require("../authentication/adminAuth");
const {
  createNewElection,
  nominateCandidate,
  getAllVoters,
  registerVoter,
  signupAdmin,
  loginAdmin,
  addImages,
  getImages,
} = require("../services/adminService");

const {
  getAllElection,
  getAllCandidateOfElection,
  getOnGoingElection,
} = require("../services/electionService");
const imageHandle = require("../extras/media");

router.post("/new-election", imageHandle.single("eleImage"), (req, res) => {
  createNewElection(req, res);
});

router.get("/all-election", (req, res) => {
  getAllElection(req, res);
});

router.post("/new-cand", adminAuth, (req, res) => {
  nominateCandidate(req, res);
});

router.get("/all-cand/:electionID", adminAuth, (req, res) => {
  getAllCandidateOfElection(req, res);
});

router.get("/all-voter", adminAuth, (req, res) => {
  getAllVoters(req, res);
});

router.get("/reg-voter/:eleID", adminAuth, (req, res) => {
  registerVoter(req, res);
});

router.get("/current-ele", adminAuth, (req, res) => {
  getOnGoingElection(req, res);
});

router.post("/admin-signup", (req, res) => {
  signupAdmin(req, res);
});

router.post("/admin-login", (req, res) => {
  loginAdmin(req, res);
});

router.post("/add-images", imageHandle.single("ad-image"), (req, res) => {
  addImages(req, res);
});

router.get("/get-images/:imageName", (req, res) => {
  getImages(req, res);
});

module.exports = router;
