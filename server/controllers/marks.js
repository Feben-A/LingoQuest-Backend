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

const update = async (req, res) => {
  const student_id = req.student_id;
  try {
    const currentMark = await Marks.getMarkById(student_id);
    const response = await currentMark.updateMarks();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { showLeaderboard, update };
