import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import BuscarController from './app/controllers/BuscarController';

import authMiddleware from './app/middlewares/auth';

const routes = new Router();

routes.post('/signin', SessionController.store);
routes.post('/signup', UserController.store);

routes.use(authMiddleware);

routes.get('/buscar', BuscarController.index);

export default routes;
