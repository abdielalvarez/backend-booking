// DEBUG=app:* node src/scripts/mongo/seedApiKeys.js

const chalk = require('chalk');
const crypto = require('crypto');
const debug = require('debug')('app:scripts:api-keys');
const MongoLib = require('../../lib/mongo');

const adminScopes = [
  'signin:auth',
  'signup:auth',
  'read:users',
  'create:users',
  'update:users',
  'delete:users',
  'read:restaurants',
  'create:restaurants',
  'update:restaurants',
  'delete:restaurants',
  'read:user-restaurants',
  'create:user-restaurants',
  'update:user-restaurants',
  'delete:user-restaurants',
  'read:bookings',
  'create:bookings',
  'update:bookings',
  'delete:bookings'
];

const userScopes = [
  'signin:auth',
  'signup:auth',
  'read:restaurants',
  'read:user-restaurants',
  'create:user-restaurants',
  'update:user-restaurants',
  'delete:user-restaurants',
  'read:bookings',
  'create:bookings',
  'update:bookings',
  'delete:bookings'
];

const ownerScopes = [
  'signin:auth',
  'signup:auth',
  'read:restaurants',
  'create:restaurants',
  'update:restaurants',
  'delete:restaurants',
  'read:bookings',
  'delete:bookings'
];

const apiKeys = [
  {
    token: generateRandomToken(),
    scopes: adminScopes
  },
  {
    token: generateRandomToken(),
    scopes: userScopes
  },
  {
    token: generateRandomToken(),
    scopes: ownerScopes
  }
];

function generateRandomToken() {
  const buffer = crypto.randomBytes(32);
  return buffer.toString('hex');
}

async function seedApiKeys() {
  try {
    const mongoDB = new MongoLib();

    const promises = apiKeys.map(async apiKey => {
      await mongoDB.create('api-keys', apiKey);
    });

    await Promise.all(promises);
    debug(chalk.green(`${promises.length} api keys have been created succesfully`));
    return process.exit(0);
  } catch (error) {
    debug(chalk.red(error));
    process.exit(1);
  }
}

seedApiKeys();
