const express = require('express');
const { getStatus, getStats } = require('../controllers/AppController');

const AppRouter = express.Router();

AppRouter.get('/status', getStatus);

AppRouter.get('/stats', getStats);

module.exports = AppRouter;
