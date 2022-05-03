const StatisticsModel = require("../models/statistics.model.js");
const TeamModel = require('../models/team.model.js')

const getDataByTeam = async (team, db) => {
  return new Promise(async (res, rej) => {
    const result = await Promise.allSettled([
      getTotalByTeam(team, db),
      getClosedByTeam(team, db)
    ]);
    if (result) {
      const resultSend = result.reduce((acc, item) => {
        if (item.status === 'fulfilled') {
          acc[team] = Object.assign(acc[team], item.value);
          return acc;
        }
      }, { [team]: {} });
      res(resultSend);
      return;
    }
    rej();
  });
};

const getTotalByTeam = async (team, db) => {
  return await new Promise((res, rej) => {
    return StatisticsModel.getTotalByTeam(team, db, (err, data) => {
      if (err) return rej(err);
      res({total: data });
    })
  });
};

const getClosedByTeam = async (team, db) => {
  return await new Promise((res, rej) => {
    return StatisticsModel.getClosedByTeam(team, db, (err, data) => {
      if (err) return rej(err);
      res({closed: data });
    })
  });
};

const getChartData = async (db) => {
  return await new Promise((res, rej) => {
    return StatisticsModel.getClosedByDate(db, (err, data) => {
      if (err) return rej(err);
      res(data);
    })
  });
};

exports.getStatistics = async (req, res, db) => {
  TeamModel.getAll(db, async (err, data) => {
    if (err) return;
    const result = await Promise.allSettled(data.map(item => getDataByTeam(item.id, db)));
    if (result) {
      let resultSend = {
        stats: result.reduce((acc, item) => {
          if (item.status === 'fulfilled') {
            return Object.assign(acc, item.value);
          }
        }, {})
      };
      const resultChart = await getChartData(db);
      if (resultChart) {
        resultSend = Object.assign(resultSend, { chart: resultChart });
      }
      res.send({ data: resultSend, success: true });
    } else {
      res.status(500).send({
        error: true,
        message: "Server error"
      });
    }
  });
};
