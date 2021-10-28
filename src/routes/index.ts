import express, { Request, Response } from 'express';
import { createConnection } from 'typeorm';


import { getCustomRepository } from 'typeorm';

import { UserController } from '../controllers/UserController';
import { UserService } from '../services/UserService';

import { UserRepository } from '../repositories/UserRepository';
import AuthenticateUserController from '../controllers/AuthenticateUserController';
import AuthenticateUserService from '../services/AuthenticateUserService';

createConnection().then(() => {

  const userRepository = getCustomRepository(UserRepository);

  const userService = new UserService(userRepository);
  const userController = new UserController(userService);
  const authenticateUserService = new AuthenticateUserService(userRepository);
  const authenticateUserController = new AuthenticateUserController(authenticateUserService);

  const app = express();
  app.use(express.json());

  app.post('/login', authenticateUserController.handleAuthenticateUser)
  app.post('/user', async (request: Request, response: Response) => {
    return await userController.createUser(request, response);
  });

  app.listen(3000, () => {
    console.log('Server started on port 3000');
  });
});
