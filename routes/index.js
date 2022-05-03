const teams = require("./controllers/team.controller.js");
const tasks = require("./controllers/tasks.controller.js");
const statistics = require("./controllers/statistics.controller.js");

const router = (app, db) => {
  app.get('/tasks', (req, res) => tasks.getList(req, res, db));
  app.get('/tasks/:id', (req, res) => tasks.getTask(req, res, db));
  app.put('/tasks/:id', (req, res) => tasks.updateTask(req, res, db));
  app.delete('/tasks/:id', (req, res) => tasks.deleteTask(req, res, db));
  app.post('/tasks/create', (req, res) => tasks.createTask(req, res, db));

  app.get('/teams', (req, res) => teams.getAll(req, res, db));
  app.get('/teams/:id/members', (req, res) => teams.getTeamMembers(req, res, db));

  app.get('/statistics', (req, res) => statistics.getStatistics(req, res, db));
}

module.exports = router;
