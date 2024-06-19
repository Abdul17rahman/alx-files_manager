const sha = require('sha1');
const { ObjectId } = require('mongodb');
const dbClient = require('../utils/db');
const redisClient = require('../utils/redis');

class UsersController {
  static async postNew(req, res) {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).send({
        error: 'Missing email',
      });
    }
    if (!password) {
      return res.status(400).send({
        error: 'Missing password',
      });
    }
    const collection = dbClient.client.db().collection('users');
    const user = await collection.findOne({ email });
    if (user) {
      return res.status(400).send({
        error: 'Already exist',
      });
    }
    const hashed = sha(password);
    const addedUser = await collection.insertOne({
      email,
      password: hashed,
    });
    return res.status(201).send({
      id: addedUser.insertedId,
      email,
    });
  }

  static async getMe(req, res) {
    const authHeader = req.headers['x-token'];
    const userId = await redisClient.get(`auth_${authHeader}`);
    if (!userId) {
      return res.status(401).send({
        error: 'Unauthorized',
      });
    }
    const collection = dbClient.client.db().collection('users');
    const oId = new ObjectId(userId);
    const foundUser = await collection.findOne({ _id: oId });
    return res.status(200).send({
      id: foundUser._id,
      email: foundUser.email,
    });
  }
}

module.exports = UsersController;
