const { createClient } = require('redis');

class RedisClient {
  constructor () {
    this._client = createClient();
    this._client.on('error', err => {
      console.log(err);
    });
  }

  isAlive () {
    return this._client.connected;
  }

  async get (key) {
    return new Promise((resolve, reject) => {
      this._client.get(key, (err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  }

  async set (key, val, dur) {
    return new Promise((resolve, reject) => {
      this._client.setex(key, dur, val, (err, reply) => {
        if (err) reject(err);
        resolve(reply);
      });
    });
  }

  async del (key) {
    return new Promise((resolve, reject) => {
      this._client.del(key, (err) => {
        if (err) reject(err);
        resolve();
      });
    });
  }
}

const redisClient = new RedisClient();

module.exports = redisClient;
