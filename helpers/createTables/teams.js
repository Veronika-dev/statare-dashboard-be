module.exports = function(sql) {
  const request = `CREATE TABLE IF NOT EXISTS teams(
                          id VARCHAR(15) NOT NULL PRIMARY KEY UNIQUE,
                          name VARCHAR(15) NOT NULL
                      )`;
  sql.query(request, (err) => {
    if (err) return console.log('[Statare Dashboard] CreateTeamTable error: ', err.message);
  });
}
