import sha from 'sha1';
import uuid from 'uuid';
import base64url from 'base64url';
import dbClient from '../utils/db';
import redisClient from '../utils/redis';

class AuthController {
  static async getConnect(req, res) {
    const collection = dbClient.client.db().collection('users');
    const authHeaders = req.headers.authorization;
    const [email, password] = base64url.decode(authHeaders.split(' ')[1]).split(':');
    const hashed = sha(password);
    const foundUser = await collection.findOne({
      email,
      password: hashed,
    });
    if (!foundUser) {
      return res.status(401).send({
        error: 'Unauthorized',
      });
    }
    const { _id } = foundUser;
    const token = uuid.v4();
    redisClient.set(`auth_${token}`, _id.toString(), 86400);
    return res.status(200).send({ token });
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

export default AuthController;
