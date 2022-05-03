module.exports = function(sql) {
  const request = `INSERT IGNORE INTO staff (name, surname, team_id)
                        SELECT t.*
                        FROM (
                        (SELECT 'Andrew' as col1, 'Davis' as col2, 'frontend' as col3) union all
                        (SELECT 'Mila', 'Sonor', 'frontend') union all
                        (SELECT 'Leon', 'Mezon', 'frontend') union all
                        (SELECT 'Daniil', 'Black', 'design') union all
                        (SELECT 'Sasha', 'Rotnik', 'backend') union all
                        (SELECT 'Andrew', 'Simrius', 'backend') union all
                        (SELECT 'Max', 'Lenn', 'backend') union all
                        (SELECT 'Zak', 'Ellon', 'backend')
                        ) t
                        WHERE NOT EXISTS (SELECT * FROM staff);
                   `;
  sql.query(request, (err) => {
    if (err) return console.log('[Statare Dashboard] FillStaffTable error: ', err.message);
  });
}
