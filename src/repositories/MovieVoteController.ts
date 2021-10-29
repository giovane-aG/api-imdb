import { Request, Response } from "express";


export class MovieVoteController {

  private readonly movieVoteService;

  constructor(movieVoteService) {
    this.movieVoteService = movieVoteService;
  }

  async vote(request: Request, response: Response) {
    try {

      const { movieId, rate } = request.body;

      await this.movieVoteService.vote(movieId, rate);

      response.status(200).json({ message: "Vote saved successfully" });

    } catch (error) {
      response.status(400).json({ message: error.message });
    }
  }
}