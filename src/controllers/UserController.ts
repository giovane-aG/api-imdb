import { Request, Response } from 'express';
export class UserController {
  private readonly userService: any;

  constructor(userService) {
    this.userService = userService;
  }

  async createUser(request: Request, response: Response) {
    try {

      const { name, email, password } = request.body;
  
      const user = await this.userService.createUser({
        name,
        email,
        password,
      });

      return response.status(201).json(user);

    } catch(error) {

      return response.status(400).json({
        message: error.message,
      });
    }
  }
}