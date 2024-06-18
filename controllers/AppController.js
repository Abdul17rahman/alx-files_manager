const redisClient = require('../utils/redis');
const dbClient = require('../utils/db');

class AppController {
	static getStatus(req, res) {
  		if (redisClient.isAlive() && dbClient.isAlive()) {
    		res.status(200).send({
      			redis: true,
      			db: true,
    		});
  		}
	}
	static async getStats(req, res) {
  		const users = await dbClient.nbFiles();
  		const files = await dbClient.nbUsers();
  		return res.status(200).send({
    		users,
    		files,
  		});
	}
}

module.exports = AppController;
