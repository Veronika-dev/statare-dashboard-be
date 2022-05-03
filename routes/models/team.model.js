const Teams = function(team) {
};

Teams.getAll = (sql, cb) => {
  sql.query(`SELECT * FROM teams`, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

Teams.getTeamMembers = (id, sql, cb) => {
  sql.query(`SELECT * FROM staff WHERE team_id="${id}"`, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

module.exports = Teams;
