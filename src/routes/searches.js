const express = require('express');
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
    '/', async function (req, res, next) {
    const { body: piece } = req;
    const search = await searchService.createSearch({ piece });
    res.status(201).json(search)
  });

  router.put(
    '/searches/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: piece } = req
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
