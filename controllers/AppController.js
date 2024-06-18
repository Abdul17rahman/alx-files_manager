const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

function getStatus(req, res) {
  if (redisClient.isAlive() && dbClient.isAlive()) {
    return res.status(200).json({
      redis: true,
      db: true,
    });
  }
}

async function getStats(req, res) {
  const users = await dbClient.nbFiles();
  const files = await dbClient.nbUsers();
  return res.status(200).json({
    users,
    files,
  });
}

module.exports = {
  getStatus, getStats,
};
