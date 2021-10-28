import express from 'express';

// const Connection = require('../database/connection');

import { getRepository } from 'typeorm';

import UserController from '../controllers/UserController';
import UserService from '../services/UserService';

import AuthenticateUserController from '../controllers/AuthenticateUserController';
import AuthenticateUserService from '../services/AuthenticateUserService';

const userRepository = getRepository('User')

const userService = new UserService(userRepository);
const userController = new UserController(userService);
const authenticateUserService = new AuthenticateUserService(userRepository);
const authenticateUserController = new AuthenticateUserController(authenticateUserService);

const app = express();
app.use(express.json());

app.post('/login', authenticateUserController.handleAuthenticateUser)
app.post('/users', userController.createUser);

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
