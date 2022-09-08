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
router.post("/new-election", adminAuth, imageHandle.single("eleImage"), (req, res) => {
  createNewElection(req, res);
});

router.delete("/dele-election/:eleID", adminAuth, (req, res) => {
  deteletElection(req, res);
});

router.get("/all-election", adminAuth, (req, res) => {
  getAllElection(req, res);
});

router.get("/current-ele", adminAuth, (req, res) => {
  getOnGoingElection(req, res);
});

// candidates
router.post("/new-cand", adminAuth, (req, res) => {
  createCandidate(req, res);
});

router.get("/all-cand/:electionID", adminAuth, (req, res) => {
  getAllCandidateOfElection(req, res);
});

router.get("/all-cand", adminAuth, (req, res) => {
  getAllCandidate(req, res)
})

router.post("/reg-cand", adminAuth, (req, res) => {
  registerCandidate(req, res)
})

// block
router.get("/gen-genblock/:eleID", adminAuth, (req, res) => {
  genisesBlock(req, res)
})

router.get("/get-blocks", adminAuth, (req, res) => {
  getAllBlocks(req, res);
});

// voters
router.get("/all-voter", adminAuth, (req, res) => {
  getAllVoters(req, res);
});

router.get("/reg-voter/:eleID", adminAuth, (req, res) => {
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
router.post("/add-images", adminAuth, imageHandle.single("ad-image"), (req, res) => {
  addImages(req, res);
});

router.get("/get-images/:imageName", (req, res) => {
  getImages(req, res);
});

module.exports = router;
