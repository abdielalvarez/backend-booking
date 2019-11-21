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

  createBooking(collection, data, restaurantId, restaurantName, restaurantCategory, userId, userName, bookDate, bookHour) {
    // date:
    const instance = new Date()
    const day = instance.getUTCDate()
    const month = instance.getUTCMonth() + 1
    const year = instance.getUTCFullYear()
    const date = `${day}-${month}-${year}`
    data["creationDate"] = date
    // hour:
    const hour = instance.getHours()
    const minutes = instance.getMinutes()
    const hours = `${hour}:${minutes}`
    data["creationHour"] = hours

    // restaurant:
    const restaurant = {}
    const restId = ObjectId(restaurantId)
    restaurant["restaurantId"] = restId
    restaurant["restaurantName"] = restaurantName
    // user:
    const user = {}
    const user_id = ObjectId(userId)
    user["userId"] = user_id
    user["userName"] = userName

    // data: {restaurant, user}
    data["restaurant"] = restaurant
    data["user"] = user
    // date: bookDate
    data["bookDate"] = bookDate
    // date: bookHour
    data["bookHour"] = bookHour

    // define category key
    const oneL = restaurantCategory.charAt(0)
    const twoL = restaurantCategory.charAt(1)
    const threeL = restaurantCategory.charAt(2)
    const complete = oneL.concat(twoL, threeL)
    const categoryKey = complete.toUpperCase()
    // define booking date key
    const split = bookDate.split("")
    const oneD = split[0]
    const twoD = split[1]
    const threeD = split[2]
    const fourD = split[3]
    const fiveD = split[5]
    const sixD = split[6]
    const sevenD = split[8]
    const eightD = split[9]
    const joinMonth = fiveD.concat(sixD) - 1
    const monthArray = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
    const monthKey = monthArray[joinMonth]
    // define random key
    const randomKey = Math.floor((Math.random() * 100) + 1);
    // define general booking key
    const generalKey = categoryKey.concat(sevenD, eightD, monthKey, oneD, twoD, threeD, fourD, randomKey)
    data["bookKey"] = generalKey

    return this.connect()
      .then(db => db.collection(collection).insertOne(data))
      .then(result => result.insertedId)
  };

  create(collection, data) {
    return this.connect()
      .then(db => db.collection(collection).insertOne(data))
      .then(result => result.insertedId)
  };

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