const TeamModel = require("../models/team.model.js");

exports.getAll = async (req, res, db) => {
  TeamModel.getAll(db, (err, data) => {
    if (err)
      res.status(500).send({
        error: true,
        message: err.message || "Server error"
      });
    else {
      res.send({ data, success: true });
    }
  });
};

exports.getTeamMembers = async (req, res, db) => {
  const { id } = req.params;
  if (!id) res.status(500).send({ error: true, message: "id is required" });
  TeamModel.getTeamMembers(id, db, (err, data) => {
    if (err)
      res.status(500).send({
        error: true,
        message: err.message || "Server error"
      });
    else {
      res.send({ data, success: true });
    }
  });
};
