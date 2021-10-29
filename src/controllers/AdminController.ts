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
        password
      });

      return response.status(200).json(admin);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}