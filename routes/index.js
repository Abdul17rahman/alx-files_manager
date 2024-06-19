import express from 'express';
import AppController from '../controllers/AppController';
import UsersController from '../controllers/UsersController';
import AuthController from '../controllers/AuthController';

const AppRouter = express.Router();

AppRouter.get('/status', AppController.getStatus);

AppRouter.get('/stats', AppController.getStats);

AppRouter.post('/users', UsersController.postNew);

AppRouter.get('/connect', AuthController.getConnect);

AppRouter.get('/disconnect', AuthController.getDisconnect);

AppRouter.get('/users/me', UsersController.getMe);

export default AppRouter;
