const Statistics = function(team) {
};

Statistics.getTotalByTeam = (team, sql, cb) => {
  sql.query(`SELECT COUNT(*) as count FROM tasks
             WHERE team_id="${team}" AND is_deleted=0 AND 
                   (due_date <= CURDATE() OR status="CLOSED")
                    `, (err, res) => {
    if (err) return cb(err);
    return cb(null, res && res[0] ? res[0].count : 0);
  });
};

Statistics.getClosedByTeam = (team, sql, cb) => {
  sql.query(`SELECT COUNT(*) as count FROM tasks
             WHERE team_id="${team}" AND is_deleted=0 AND status="CLOSED"
            `, (err, res) => {
    if (err) return cb(err);
    return cb(null, res && res[0] ? res[0].count : 0);
  });
};

Statistics.getClosedByDate = (sql, cb) => {
  sql.query(`SELECT DATE(status_date) as status_date, COUNT(*) as count FROM tasks WHERE is_deleted=0 AND status="CLOSED"
             GROUP BY DATE(status_date) ORDER BY DATE(status_date)
            `, (err, res) => {
    if (err) return cb(err);
    return cb(null, res);
  });
};

module.exports = Statistics;
