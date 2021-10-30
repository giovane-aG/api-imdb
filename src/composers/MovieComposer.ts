import { Request, Response, Router } from 'express';
import { MovieController } from '../controllers/MovieController';
import { MovieRepository } from '../repositories/MovieRepository';
import { MovieService } from '../services/MovieService';
import { MovieVoteController } from '../repositories/MovieVoteController';
import { MovieVoteService } from '../services/MovieVoteService';
import { ensureAutheticate } from '../middlewares/ensureAutheticate';
import { ensureIsAdmin } from '../middlewares/ensureIsAdmin';
import { getCustomRepository } from 'typeorm';

export class MovieComposer {
    public static compose(router: Router) {

      const movieRepository = getCustomRepository(MovieRepository);
      const movieService = new MovieService(movieRepository);
      const movieController = new MovieController(movieService);

      const voteMovieService = new MovieVoteService(movieRepository);
      const voteMovieController = new MovieVoteController(voteMovieService);

      router.get('/movie', async (request: Request, response: Response) => {
        return await movieController.getMovies(request, response);
      });

      router.post('/movie', ensureAutheticate, ensureIsAdmin, async (request: Request, response: Response) => {
        return await movieController.createMovie(request, response);
      });

      router.put('/movie/:id', ensureAutheticate, ensureIsAdmin, async (request: Request, response: Response) => {
        return await movieController.updateMovie(request, response);
      });

      router.patch('/vote/:id', ensureAutheticate, async (request: Request, response: Response) => {
        return await voteMovieController.vote(request, response);
      });
    }
}