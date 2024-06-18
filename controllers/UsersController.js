const sha = require('sha1');
const dbClient = require('../utils/db');

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
}

module.exports = UsersController;
