// DEBUG=app:* node src/scripts/mongo/seedRestaurants.js

const chalk = require('chalk');
const debug = require('debug')('app:scripts:restaurants');
const MongoLib = require('../../lib/mongo');
const { restaurantsMock } = require('../../utils/mocks');

async function seedRestaurants() {
  try {
    const mongoDB = new MongoLib();

    const promises = restaurantsMock.map(async restaurant => {
      await mongoDB.create('restaurants', restaurant);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} restaurants have been created succesfully`));
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedRestaurants();
