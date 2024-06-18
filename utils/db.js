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
    this._dbClient
      .connect()
      .then(() => {
        this.db = this._dbClient.db(this.database);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  isAlive() {
    if (this.db) {
      return true;
    }
    return false;
  }

  async nbUsers() {
    // returns number of documents in user collection.
    return this.db.collection('users').countDocuments();
  }

  async nbFiles() {
    // returns the number of documents in file collection
    return this.db.collection('files').countDocuments();
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
