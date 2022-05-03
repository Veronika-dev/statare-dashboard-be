const statuses = require('./statuses');
const teams = require('./teams');
const staff = require('./staff');
const tasks = require('./tasks');

module.exports = function (sql) {
  statuses(sql);
  teams(sql);
  staff(sql);
  tasks(sql);
}
