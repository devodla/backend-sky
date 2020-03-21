import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';

const routes = new Router();

routes.post('/signin', SessionController.store);
routes.post('/signup', UserController.store);

export default routes;
