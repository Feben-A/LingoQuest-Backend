const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    
    //verify method arguments : token, secret, callback
    jwt.verify(token, process.env.SECRET_TOKEN, async (err, data) => {
      if (err) {
        res.status(403).json({ err: "No valid token" });
      } else {
        req.student_id = data.student_id;
        next();
      }
    });
  }
};

module.exports = authentication;
