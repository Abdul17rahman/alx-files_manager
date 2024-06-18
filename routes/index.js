const express = require('express');
const AppController = require('../controllers/AppController');

const AppRouter = express.Router();

AppRouter.get('/status', AppController.getStatus);

AppRouter.get('/stats', AppController.getStats);

module.exports = AppRouter;
