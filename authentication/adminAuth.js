const jwt = require("jsonwebtoken");

const key = "mytokenkey";

const adminAuth = (req, res, next) => {
  token = req.headers.authorization || "";

  if (!token) {
    return res.status(400).json({ info: "no authorization header provided" });
  }

  jwt.verify(token, key, (err, data) => {
    if (err) {
      return res.status(400).json({ err: err });
    } else {
      if (data.role === "admin") {
        req.user = {
          _id: data._id,
        };
        next();
      } else {
        return res.status(400).json({ err: "error role is not matched" });
      }
    }
  });
};

module.exports = adminAuth;
