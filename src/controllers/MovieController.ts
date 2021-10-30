import { Request, Response } from "express";


export class MovieController {
  private readonly movieService: any;

  constructor (movieService: any) {
    this.movieService = movieService;
  }

  async getMovies (request: Request, response: Response) {
    try {

      const { id, title, description, director, gender } = request.query;

      const movies = await this.movieService.getMovie({ id, title, description, director, gender });

      return response.status(200).json(movies);
      
    } catch (error) {
      console.log('error :>> ', error);
      return response.status(400).json({ message: error.message });
    }
      
  }

  async createMovie (request: Request, response: Response) {
    try {
      
      const { title, description, director, gender } = request.body;

      const movie = await this.movieService.createMovie({ title, description, director, gender });

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