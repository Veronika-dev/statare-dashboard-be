module.exports = function(sql) {
  const request = `INSERT IGNORE INTO statuses (id, name) 
                        VALUES ('OPENED', "Opened"),
                               ('IN_PROGRESS', "In progress"),
                               ('CLOSED', "Closed")
                   `;
  sql.query(request, (err) => {
    if (err) return console.log('[Statare Dashboard] FillStatusesTable error: ', err.message);
  });
}
