const TasksModel = require("../models/tasks.model.js");

exports.getList = async (req, res, db) => {
  const pagination = req.query;
  TasksModel.getList(pagination, db, (err, data) => {
    if (err)
      res.status(500).send({
        error: true,
        message: err.message || "Server error"
      });
    else {
      TasksModel.getCount(db, (err, total) => {
        const { offset, limit } = pagination;
        const dataSend = Object.assign({}, { data, offset: +offset, limit: +limit }, err ? {} : { total })
        res.send({ data: dataSend, success: true });
      })
    }
  });
};

exports.getTask = async (req, res, db) => {
  const { id } = req.params;
  TasksModel.getTask(id, db, (err, data) => {
    if (err)
      res.status(500).send({
        error: true,
        message: err.message || "Server error"
      });
    else {
      res.send({ data: data[0], success: true });
    }
  });
};

exports.updateTask = async (req, res, db) => {
  const { id } = req.params;
  const body = req.body;
  if (!body) {
    return res.status(400).send({
      message: "Body is empty"
    });
  }
  TasksModel.updateTask(id, body, db, (err, data) => {
    if (err)
      res.status(500).send({
        error: true,
        message: err.message || "Server error"
      });
    else {
      res.send({ data: data[0], success: true });
    }
  });
};

exports.createTask = async (req, res, db) => {
  const body = req.body;
  if (!body || !body.title) {
    return res.status(400).send({
      message: "Required fields are empty"
    });
  }
  TasksModel.createTask(body, db, (err, data) => {
    if (err)
      res.status(500).send({
        error: true,
        message: err.message || "Server error"
      });
    else {
      res.send({ data: data[0], success: true });
    }
  });
};

exports.deleteTask = async (req, res, db) => {
  const { id } = req.params;
  TasksModel.deleteTask(id, db, (err, data) => {
    if (err)
      res.status(500).send({
        error: true,
        message: err.message || "Server error"
      });
    else {
      res.send({ success: true });
    }
  });
};
