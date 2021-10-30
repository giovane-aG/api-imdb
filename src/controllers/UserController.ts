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

  async updateUser(request: Request, response: Response) {
    try {

      const loggedUserId = request.user_id;
      const userId = request.params.id;

      if (loggedUserId !== userId) throw new Error('You can only update your own profile');
      
      const { name, email, password } = request.body;
  
      await this.userService.updateUser({
        id: userId,
        name,
        email,
        password,
      });

      return response.status(200).json({message: 'User updated successfully'});

    } catch(error) {

      return response.status(400).json({
        message: error.message,
      });
    }
  }

  async deleteUser(request: Request, response: Response) {
    try {

      const user_id = request.user_id;
      await this.userService.deleteUser(user_id);

      return response.status(200).json({message: 'User deleted successfully'});

    } catch(error) {

      return response.status(400).json({
        message: error.message,
      });
    }
  }
  
}