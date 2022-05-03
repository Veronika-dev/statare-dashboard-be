module.exports = function(sql) {
  const request = `CREATE TABLE IF NOT EXISTS tasks(
                          id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          title VARCHAR(125) NOT NULL,
                          due_date DATE,
                          created_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                          description VARCHAR(500),
                          status_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                          status VARCHAR(15) DEFAULT 'OPENED',
                          FOREIGN KEY(status) REFERENCES statuses(id),
                          team_id VARCHAR(15),
                          FOREIGN KEY(team_id) REFERENCES teams(id),
                          is_deleted TINYINT(1) DEFAULT 0
                      )`;
  sql.query(request, (err) => {
    if (err) return console.log('[Statare Dashboard] CreateTasksTable error: ', err.message);
  });
}
