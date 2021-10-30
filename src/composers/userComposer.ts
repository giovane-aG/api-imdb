import { Router, Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import validator from 'validator';
import jsonwebtoken from 'jsonwebtoken';

import { UserController } from '../controllers/UserController';
import { AdminController } from '../controllers/AdminController';
import { AuthenticateUserController } from '../controllers/AuthenticateUserController';

import { UserService } from '../services/UserService';
import { AdminService } from '../services/AdminService';
import AuthenticateUserService from '../services/AuthenticateUserService';

import { UserRepository } from '../repositories/UserRepository';
import { ensureAutheticate } from '../middlewares/ensureAutheticate';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';

export class UserComposer {

  public static compose(router: Router) {

    const userRepository = getCustomRepository(UserRepository);

    const userService = new UserService({userRepository, bcrypt, validator});
    const userController = new UserController(userService);

    const adminService = new AdminService({userRepository, bcrypt, validator});
    const adminController = new AdminController(adminService);

    const authenticateUserService = new AuthenticateUserService({userRepository, bcrypt, jsonwebtoken});
    const authenticateUserController = new AuthenticateUserController(authenticateUserService);


    router.post('/login', async (request: Request, response: Response) => {
      return await authenticateUserController.handleAuthenticateUser(request, response);
    })

    router.post('/user', async (request: Request, response: Response) => {
      return await userController.createUser(request, response);
    });

    router.put('/user/:id', ensureAutheticate, async (request: Request, response: Response) => {
      return await userController.updateUser(request, response);
    });

    router.delete('/user', ensureAutheticate, async (request: Request, response: Response) => {
      return await userController.deleteUser(request, response);
    });

    router.post('/admin', async (request: Request, response: Response) => {
      return await adminController.createAdmin(request, response);
    })

    router.put('/admin', ensureAutheticate, ensureIsAdmin, async (request: Request, response: Response) => {
      return await adminController.updateAdmin(request, response);
    })
  }
}

