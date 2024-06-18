import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';

const express = require('express');

const AppRouter = express.Router();

AppRouter.get('/status', AppController.getStatus);

AppRouter.get('/stats', AppController.getStats);

AppRouter.post('/users', UsersController.postNew);

module.exports = AppRouter;
