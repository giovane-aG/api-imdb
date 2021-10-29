import { Request, Response } from 'express';

export class AdminController {
  private adminService;

  constructor (adminService) {
    this.adminService = adminService;
  }

  async createAdmin (request: Request, response: Response) {
    try {
      const { name, email, password } = request.body;

      const admin = await this.adminService.createAdmin({
        name,
        email,
        password,
      });

      return response.status(200).json(admin);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }

  async updateAdmin (request: Request, response: Response) {
    try {
      const user_id = request.user_id;
      const { name, email, password } = request.body;

      await this.adminService.updateAdmin({
        name,
        email,
        password,
        id: user_id,
      });

      return response.status(200).json({ message: 'Admin updated successfully' });
    } catch (error) {
      console.log('error :>> ', error);
      return response.status(400).json({ error: error.message });
    }
  }
}