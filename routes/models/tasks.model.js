const Tasks = function(team) {
};

Tasks.getCount = (sql, cb) => {
  sql.query(`SELECT COUNT(*) as count FROM tasks WHERE is_deleted=0`, (err, res) => {
    if (err) return cb(err);
    return cb(null, res && res[0] ? res[0].count : 0);
  });
};

Tasks.getList = (pagination, sql, cb) => {
  const limit = pagination.limit || 10;
  const offset = pagination.offset || 0;
  sql.query(`SELECT id, title, due_date, status, team_id FROM tasks WHERE is_deleted=0 ORDER BY id DESC LIMIT ${limit} OFFSET ${offset}`, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

Tasks.getTask = (id, sql, cb) => {
  sql.query(`SELECT * FROM tasks WHERE id=${id}`, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

Tasks.createTask = (task, sql, cb) => {
  delete task.id;
  const keys = [];
  const values = [];
  Object.keys(task).map((key) => {
    if (task[key]) {
      keys.push(key);
      values.push('"' + task[key] + '"');
    }
  });
  const queryKeys = keys.join(', ');
  const queryValues = values.join(', ');
  sql.query(`INSERT into tasks (${queryKeys}) VALUES (${queryValues})`, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

Tasks.updateTask = (id, task, sql, cb) => {
  const keysAllowed = ['title', 'due_date', 'description', 'status', 'team_id'];
  const queries = [];
  keysAllowed.map((key, i) => {
    if (key in task) {
      queries.push(key + '="' + task[key] + '"');
      if (key === 'status') {
        const date = (new Date()).toISOString().split('.')[0].split('T').join(' ');
        queries.push('status_date="' + date + '"');
      }
    }
  });
  const query = queries.join(', ');
  sql.query(`UPDATE tasks SET ${query} WHERE id=${id}`, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

Tasks.deleteTask = (id, sql, cb) => {
  sql.query(`DELETE FROM tasks WHERE id=${id}`, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

module.exports = Tasks;
