var express = require("express");
var router = express.Router();
const adminAuth = require("../authentication/adminAuth");
const {
  createNewElection,
  deteletElection,
  createCandidate,
  getAllCandidate,
  registerCandidate,
  genisesBlock,
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

const {
  getAllBlocks
} = require("../services/voterService");

const imageHandle = require("../extras/media");

// election
router.post("/new-election", (req, res) => {
  createNewElection(req, res);
});

router.delete("/dele-election/:eleID", (req, res) => {
  deteletElection(req, res);
});

router.get("/all-election", (req, res) => {
  getAllElection(req, res);
});

router.get("/current-ele", (req, res) => {
  getOnGoingElection(req, res);
});

// candidates
router.post("/new-cand", (req, res) => {
  createCandidate(req, res);
});

router.get("/all-cand/:electionID", (req, res) => {
  getAllCandidateOfElection(req, res);
});

router.get("/all-cand", (req, res) => {
  getAllCandidate(req, res)
})

router.post("/reg-cand", (req, res) => {
  registerCandidate(req, res)
})

// block
router.get("/gen-genblock/:eleID", (req, res) => {
  genisesBlock(req, res)
})

router.get("/get-blocks", (req, res) => {
  getAllBlocks(req, res);
});

// voters
router.get("/all-voter", (req, res) => {
  getAllVoters(req, res);
});

router.get("/reg-voter/:eleID", (req, res) => {
  registerVoter(req, res);
});

// admin auth
router.post("/admin-signup", (req, res) => {
  signupAdmin(req, res);
});

router.post("/admin-login", (req, res) => {
  loginAdmin(req, res);
});

// others
router.post("/add-images", imageHandle.single("ad-image"), (req, res) => {
  addImages(req, res);
});

router.get("/get-images/:imageName", (req, res) => {
  getImages(req, res);
});

module.exports = router;
