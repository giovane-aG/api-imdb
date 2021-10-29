import { Request, Response } from "express";


export class MovieController {
  private readonly movieService: any;

  constructor (movieService: any) {
    this.movieService = movieService;
  }

  async createMovie (request: Request, response: Response) {
    try {
      
      const { title, description } = request.body;

      const movie = await this.movieService.createMovie({ title, description });

      response.status(201).json(movie);
      
    } catch (error) {
      console.log('error :>> ', error);
      return response.status(400).json({ message: error.message });
    }
  }

  async updateMovie (request: Request, response: Response) {
    try {
      
      const { id } = request.params;
      const { title, description } = request.body;

      await this.movieService.updateMovie({ id, title, description });

      return response.status(200).json({ message: 'Movie updated successfully' });

    } catch (error) {
      console.log('error :>> ', error);
      return response.status(400).json({ message: error.message });
    }
  }
}