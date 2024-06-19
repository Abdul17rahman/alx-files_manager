const sha = require('sha1');
const uuid = require('uuid');
const base64url = require('base64url');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class AuthController {
  static async getConnect(req, res) {
    const collection = dbClient.client.db().collection('users');
    const authHeaders = req.headers.authorization;
    const [email, password] = base64url.decode(authHeaders.split(' ')[1]).split(':');
    const foundUser = await collection.findOne({ email });
    if (!foundUser) {
      return res.status(401).send({
        error: 'Unauthorized',
      });
    }
    const hashed = sha(password);
    if (foundUser.password === hashed) {
      const { _id } = foundUser;
      const token = uuid.v4();
      redisClient.set(`auth_${token}`, _id.toString(), 86400);
      return res.status(200).send({ token });
    }
  }

  static async getDisconnect(req, res) {
    const authHeader = req.headers['x-token'];
    const userId = await redisClient.get(`auth_${authHeader}`);
    if (!userId) {
      return res.status(401).send({
        error: 'Unauthorized',
      });
    }
    await redisClient.del(`auth_${authHeader}`);
    return res.status(204).send();
  }
}

module.exports = AuthController;
