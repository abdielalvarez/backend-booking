const express = require('express');
const mongoose = require('mongoose');
const RestaurantService = require('../services/restaurants');
const Restaurant = require('../models/restaurant');


const restaurantsApi = (app) => {
  const router = express.Router();
  app.use('/api/', router);

  const restaurantService = new RestaurantService();

  router.get('/', (req, res) => {
    res.send('API restaurant v2');
  });

  router.get(
    '/restaurants', async (req, res, next) => {
    const restaurants = await restaurantService.getRestaurants()
    res.status(200).json(restaurants);
  });

  router.get(
    '/restaurant/:id?/:typeservice?', async (req, res, next) => {
    const { id, typeservice } = req.query
    const restaurant = await restaurantService.getRestaurantById(id, typeservice)
    res.status(200).json(restaurant);
  });

  router.post(
    '/', async function (req, res, next) {
    const { body: restau } = req;
    const restaurant = await restaurantService.createRestaurant({ restau });
    res.status(201).json(restaurant)
  });

  router.put(
    '/restaurants/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: piece } = req
    const restaurant = await restaurantService.updateRestaurantById({ id, ...piece })
    res.status(200).json(restaurant);
  });

  router.delete('/restaurants/:id', async (req, res, next) => {
    const { id } = req.params
    const restaurant = await restaurantService.deleteRestaurantById(id)
    res.status(200).json(restaurant);
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = restaurantsApi;