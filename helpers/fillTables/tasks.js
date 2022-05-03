module.exports = function(sql) {
  const request = `INSERT IGNORE INTO tasks (title, due_date, description, status, team_id, status_date)
                        SELECT t.*
                        FROM (
                        (SELECT 'Teams page design' as col1, '2022-04-22' as col2, 'It should be useful and user-friendly' as col3, 'CLOSED' as col4, 'design' as col5, "2022-04-25 10:10:00" as col6) union all
                        (SELECT 'Teams page layout', '2022-04-22', 'Design is in figma', 'OPENED', 'frontend', "2022-04-22 11:00:00") union all
                        (SELECT 'Tasks page design', '2022-04-25', 'It should be useful and user-friendly', 'IN_PROGRESS', 'design', "2022-04-26 13:23:00") union all
                        (SELECT 'Dashboard page design', '2022-04-27', 'It should be useful and user-friendly', 'CLOSED', 'design', "2022-05-01 16:00:00") union all
                        (SELECT 'Sidebar design', '2022-04-29', 'It should be useful and user-friendly', 'OPENED', 'design', "2022-04-29 11:00:00") union all
                        (SELECT 'Tasks page layout', '2022-04-29', 'Design is in figma', 'CLOSED', 'frontend', "2022-05-03 11:00:00") union all
                        (SELECT 'Dashboard page layout', '2022-04-29', 'Design is in figma', 'CLOSED', 'frontend', "2022-05-01 14:00:00") union all
                        (SELECT 'Add logic to the teams page', '2022-05-01', 'API is ready', 'CLOSED', 'frontend', "2022-05-01 16:00:00") union all
                        (SELECT 'Fix teams API', '2022-05-03', '', 'OPENED', 'backend', "2022-05-03 11:00:00") union all
                        (SELECT 'Create teams API', '2022-05-05', 'Backend, frontend and design', 'OPENED', 'backend', "2022-05-05 11:00:00") union all
                        (SELECT 'Add logic to the tasks page', '2022-05-04', 'API is ready', 'IN_PROGRESS', 'frontend', "2022-05-04 15:00:00") union all
                        (SELECT 'Fix teams API', '2022-05-05', 'Fix get request', 'IN_PROGRESS', 'backend', "2022-05-02 11:00:00") union all
                        (SELECT 'Create users API', '2022-05-05', 'Add some features', 'CLOSED', 'backend', "2021-05-01 14:00:00")
                        ) t
                        WHERE NOT EXISTS (SELECT * FROM tasks);
                   `;
  sql.query(request, (err) => {
    if (err) return console.log('[Statare Dashboard] FillTasksTable error: ', err.message);
  });
}
