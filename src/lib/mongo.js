const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config');
const { dbUser, dbPassword, dbHost, dbName } = config;

const MONGO_URI = `mongodb+srv://${dbUser}:${dbPassword}${dbHost}/${dbName}?retryWrites=true&w=majority`;

class MongoLib {
  constructor() {
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = dbName;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect(err => {
          if (err) {
            reject(err);
          }
          console.log('Connected succesfully to mongo');
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray()
    });
  };

  get(collection, id, typeservice) {
    return this.connect().then(db => {
      // Recibo multiples parámetros ya sean nulos o no
      let busqueda = {}
      if(id) {busqueda["_id"] = ObjectId(id)}
      if(date) {busqueda["reserved_date"] = {$date: date}}
      if(typeservice) {busqueda["restau.typeservice"] = typeservice}
        return db.collection(collection).findOne(busqueda)
    });
  };

  getS(collection, typeservice) {
    return this.connect().then(db => {
        return db.collection(collection).findOne({"restau.typeservice": typeservice })
    });
  };

  create(collection, data) {
    return this.connect()
      .then(db => db.collection(collection).insertOne(data))
      .then(result => result.insertedId)
  };

  update(collection, id, data) {
    return this.connect()
      .then(db => {
        return db.collection(collection).updateOne(
          { _id: ObjectId(id) },
          { $set: data },
          { upsert: true }
        )
      })
      .then(result => result.upsertedId || id);
  };

  delete(collection, id) {
    return this.connect()
      .then(db => {
        return db
          .collection(collection)
          .deleteOne({ _id: ObjectId(id) })
      })
      .then(() => id);
  }
}

module.exports = MongoLib;