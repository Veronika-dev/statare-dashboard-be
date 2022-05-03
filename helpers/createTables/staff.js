module.exports = function(sql) {
  const request = `CREATE TABLE IF NOT EXISTS staff(
                          id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(25) NOT NULL,
                          surname VARCHAR(25) NOT NULL,
                          team_id VARCHAR(15),
                          FOREIGN KEY(team_id) REFERENCES teams(id)
                      )`;
  sql.query(request, (err) => {
    if (err) return console.log('[Statare Dashboard] CreateStaffTable error: ', err.message);
  });
}
