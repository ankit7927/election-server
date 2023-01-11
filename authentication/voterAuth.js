const jwt = require("jsonwebtoken");

const key = "mytokenkey";

const voterAuth = (req, res, next) => {
  const token = req.headers.authorization || "";
  console.log(token)
  if (!token) {

    return res.status(400).json({ info: "no authorization header provided" });
  }

  jwt.verify(token, key, (err, data) => {
    if (err) {
      return res.status(400).json({ err: err });
    } else {
      if (data.role === "voter") {
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

module.exports = voterAuth;
