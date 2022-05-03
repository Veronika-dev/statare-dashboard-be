module.exports = function(sql) {
  const request = `INSERT IGNORE INTO teams (id, name) 
                        VALUES ('frontend', "Front-end"),
                               ('backend', "Back-end"),
                               ('design', "Design")
                   `;
  sql.query(request, (err) => {
    if (err) return console.log('[Statare Dashboard] FillTeamsTable error: ', err.message);
  });
}
