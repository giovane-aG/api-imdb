

export class MovieVoteService {
  private readonly movieRepository;

  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async vote(movieId, movieRate) {

    if (!movieId) throw new Error('Movie id is required');
    if (!movieRate) throw new Error('Movie rate is required');

    if (movieRate < 0 || movieRate > 4) throw new Error('Movie rate must be between 0 and 4');

    const movie = await this.movieRepository.findOne(movieId);

    if (!movie) throw new Error('Movie not found');

    const { rate, number_of_votes } = movie;

    const newNumberOfVotes = number_of_votes + 1;
    const newRate = (rate * number_of_votes + movieRate) / newNumberOfVotes;

    movie.rate = newRate;
    movie.number_of_votes = newNumberOfVotes;

    return this.movieRepository.update(movie.id, movie);
  }
}