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

  // router.get(
  //   '/restaurants/:type?/:zone?', async (req, res, next) => {
  //   const { type, zone } = req.query
  //   const restaurants = await restaurantService.getRestaurants(type, zone)
  //   res.status(200).json(restaurants);
  // });

  router.get(
    '/restaurant/:type?/:zone?', async (req, res, next) => {
    const { type, zone } = req.query
    const restaurants = await restaurantService.getRestaurantsList(type, zone)
    const firstRestaurant = restaurants[0]
    const response = {
      response1: restaurants,
      response2: firstRestaurant
    }
    res.status(200).json(response);
  });

  router.post(
    '/', async function (req, res, next) {
    const { body: body } = req;
    const restaurant = await restaurantService.createRestaurant({ body });
    res.status(201).json(restaurant)
  });

  router.put(
    '/restaurant/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: piece } = req
    const restaurant = await restaurantService.updateRestaurantById({ id, ...piece })
    res.status(200).json(restaurant);
  });

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