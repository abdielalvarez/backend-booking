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

  // RUTA DE PRUEBA
  getAll(collection, query) {
    return this.connect().then(db => {
      return db
        .collection(collection)
        .find(query)
        .toArray()
    });
  };

  getList(collection, category, zone) {
    return this.connect().then(db => {
      // Recibo multiples parámetros ya sean nulos o no
      let busqueda = {}
      if(category) {busqueda["category"] = category}
      if(zone) {busqueda["zone"] = zone}
        return db.collection(collection).find(busqueda).toArray()
    });
  };

  getId(collection, id) {
    return this.connect().then(db => {
        return db.collection(collection).findOne({ _id: ObjectId(id) })
    });
  };

  create(collection, data, restaurant) {
    // date:
    const instance = new Date()
    const day = instance.getUTCDate()
    const month = instance.getUTCMonth() + 1
    const year = instance.getUTCFullYear()
    const date = `${day}/${month}/${year}`
    data["date"] = date

    // hour:
    const hour = instance.getHours()
    const minutes = instance.getMinutes()
    const hours = `${hour}:${minutes}`
    data["hour"] = hours

    const id = ObjectId(restaurant)

    data["restaurantId"] = id
    
    return this.connect()
      .then(db => db.collection(collection).insertOne(data))
      .then(result => result.insertedId)
  };

  // // RUTA DE PRUEBA
  // create(collection, data) {
  //   return this.connect()
  //     .then(db => db.collection(collection).insertOne(data))
  //     .then(result => result.insertedId)
  // };

  // RUTA DE PRUEBA
  createMany(collection, data) {
    return this.connect()
      .then(db => db.collection(collection).insertMany(data))
      .then(result => result)
  };

  // RUTA DE PRUEBA
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

  // RUTA DE PRUEBA
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