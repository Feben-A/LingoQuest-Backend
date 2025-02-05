const User = require("../models/User");

const index = async (req, res) => {
  try {
    const response = await User.getStudentMarks();
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

module.exports = { index };
