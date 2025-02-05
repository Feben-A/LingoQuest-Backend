const Marks = require("../models/Marks");
const User = require("../models/User");

const showLeaderboard = async (req, res) => {
  try {
    const response = await Marks.getLeaderBoard();
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const updateMarks = async (req, res) => {};

module.exports = { showLeaderboard };
