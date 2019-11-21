const express = require('express');
const passport = require('passport');
const SearchService = require('../services/searches');

const searchesApi = (app) => {
  const router = express.Router();
  app.use('/api2/', router);

  router.get('/', (req, res) => {
    res.send('API searches v2');
  });

  const searchService = new SearchService();

  router.get(
    '/searches', async (req, res, next) => {
    const searches = await searchService.getSearches()
    res.status(200).json(searches);
  });

  router.get(
    '/searches/:id', async (req, res, next) => {
    const { id } = req.params
    const search = await searchService.getSearchById(id)
    res.status(200).json(search);
  });

  router.post(
    '/:restaurantId/:restaurantName/:restaurantCategory/:userId/:userName/:bookDate/:bookHour',
    passport.authenticate('basic', { session: false }),
    async function (req, res, next) {
    const restaurantId = req.param('restaurantId')
    const restaurantName = req.param('restaurantName')
    const restaurantCategory = req.param('restaurantCategory')
    const userId = req.param('userId')
    const userName = req.param('userName')
    const bookDate = req.param('bookDate')
    const bookHour = req.param('bookHour')
    const { body: piece } = req;
    const search = await searchService.createSearch({ ...piece }, restaurantId, restaurantName, restaurantCategory, userId, userName, bookDate, bookHour);  
    res.status(201).json(search)
  });

  router.put(
    '/searches/:id', async (req, res, next) => {
    const { id } = req.params
    const { piece } = req.body
    const search = await searchService.updateSearchById({ id, ...piece })
    res.status(200).json(search);
  });

  router.delete('/searches/:id', async (req, res, next) => {
    const { id } = req.params
    const search = await searchService.deleteSearchById(id)
    res.status(200).json(search);
  });

  router.get('*', (req, res) => {
    res.status(404).send('Error 404');
  });
}

module.exports = searchesApi;
