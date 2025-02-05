const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

async function show(req, res) {
  try {
    const student_login = req.user.student_login;
    const response = await User.getOneByStudentLogin(student_login);
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
}

async function register(req, res) {
  try {
    const data = req.body;
    // Generate a salt with a specific cost
    const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS));
    // Hash the password
    data["password"] = await bcrypt.hash(data.password, salt);
    const result = await User.create(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getOneByStudentLogin(data.student_login);
    if (!user) {
      throw new Error("No student with this student id.");
    }
    const match = await bcrypt.compare(data.password, user.password);

    if (match) {
      const payload = {
        student_id: user.student_id,
      };
      console.log("signing jwt");
      const token = jwt.sign(payload, process.env.SECRET_TOKEN, {
        expiresIn: 3600,
      });
      res.status(200).json({
        success: true,
        token: token,
      });
    } else {
      throw new Error("User could not be authenticated");
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
}

module.exports = {
  register,
  login,
  show,
};
