const express = require('express');
const passport = require('passport');
const RestaurantService = require('../services/restaurants');

const restaurantsApi = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const restaurantService = new RestaurantService();

  router.get('/', (req, res) => {
    res.send('API restaurant v2');
  });

  // RUTA DE PRUEBA
  router.get(
    '/restaurants', async (req, res, next) => {
    const restaurants = await restaurantService.getRestaurants()
    res.status(200).json(restaurants);
  });

  router.get(
    '/restaurantList/:category?/:zone?',
    passport.authenticate('basic', { session: false }),
    async (req, res, next) => {
    const { category, zone } = req.query
    const restaurants = await restaurantService.getRestaurantsList(category, zone)
    const firstRestaurant = restaurants[0]
    const response = {
      response1: restaurants,
      response2: firstRestaurant
    }
    res.status(200).json(response);
  });

  router.get(
    '/restaurantId/:id',
    passport.authenticate('basic', { session: false }),
    async (req, res, next) => {
    const { id } = req.params
    const restaurant = await restaurantService.getRestaurantById(id)
    res.status(200).json(restaurant);
  });

  // RUTA DE PRUEBA
  router.post(
    '/', async function (req, res, next) {
    const { body: piece } = req;
    const restaurant = await restaurantService.createRestaurant({ ...piece });
    res.status(201).json(restaurant)
  });

  // RUTA DE PRUEBA
  router.post(
    '/many', async function (req, res, next) {
    const { body: restaurants } = req;
    const moreRestaurants = await restaurantService.createRestaurants({ ...restaurants });
    res.status(201).json(moreRestaurants)
  });

  // RUTA DE PRUEBA
  router.put(
    '/restaurant/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: piece } = req
    const restaurant = await restaurantService.updateRestaurantById({ id, ...piece })
    res.status(200).json(restaurant);
  });

  // RUTA DE PRUEBA
  router.delete('/restaurant/:id', async (req, res, next) => {
    const { id } = req.params
    const restaurant = await restaurantService.deleteRestaurantById(id)
    res.status(200).json(restaurant);
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = restaurantsApi;