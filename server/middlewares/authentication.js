const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.header.authorisation;

  if (token) {
    //verify method arguments : token, secret, callback

    jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
      if (err) {
        res.status(403).json({ err: "No valid token" });
      } else {
        console.log(data);
        req.student_id = data;
        next();
      }
    });
  }
};

module.exports = authentication;
