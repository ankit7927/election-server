const jwt = require("jsonwebtoken");

const key = "mytokenkey";

const getToken = (_id, role) => {
  token = jwt.sign(
    {
      _id: _id,
      role: role,
    },
    key
  );

  return token;
};

module.exports = getToken;
