const Translate = require("../models/Translate");

async function show(req, res) {
  try {
    const level = req.params.level;
    const response = await Translate.getQuestions(level);
    res.status(200).json(response);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

module.exports = { show };
