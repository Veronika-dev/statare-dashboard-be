module.exports = function(sql) {
  const request = `CREATE TABLE IF NOT EXISTS statuses(
                          id VARCHAR(15) NOT NULL PRIMARY KEY UNIQUE,
                          name VARCHAR(15) NOT NULL
                      )`;
  sql.query(request, (err) => {
    if (err) return console.log('[Statare Dashboard] CreateStatusesTable error: ', err.message);
  });
}
