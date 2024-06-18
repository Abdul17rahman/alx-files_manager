const { MongoClient } = require('mongodb');

class DBClient {
  constructor() {
    this.host = process.env.DB_HOST || 'localhost';
    this.port = process.env.DB_PORT || 27017;
    this.database = process.env.DB_DATABASE || 'file_manager';
    this.url = `mongodb://${this.host}:${this.port}/${this.database}`;
    this._dbClient = new MongoClient(this.url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this._dbClient.connect()
  }

  isAlive() {
    return this._dbClient.isConnected()
  }

  async nbUsers() {
    // returns number of documents in user collection.
    return this._dbClient.db().collection('users').countDocuments();
  }

  async nbFiles() {
    // returns the number of documents in file collection
    return this._dbClient.db().collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
