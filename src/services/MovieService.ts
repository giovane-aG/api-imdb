
export class MovieService {
  private readonly movieRepository;

  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async createMovie(movie) {
    const { title, description } = movie;

    if (!title) throw new Error('Title is required');
    if (!description) throw new Error('Description is required');

    if (typeof title !== 'string') throw new Error('Title must be a string');
    if (typeof description !== 'string') throw new Error('Description must be a string');

    const newMovie = this.movieRepository.create({
      title,
      description
    });

    await this.movieRepository.save(newMovie);

    return newMovie;
  }

  async updateMovie(movie) {

    const { id, title, description } = movie;

    if (!id) throw new Error('Movie id is required');
    if (title && typeof title !== 'string') throw new Error('Title must be a string');
    if (description && typeof description !== 'string') throw new Error('Description must be a string');

    const savedMovie = await this.movieRepository.findOne(id);

    if (!savedMovie) throw new Error('Movie not found');

    savedMovie.title = title || savedMovie.title;
    savedMovie.description = description || savedMovie.description;

    await this.movieRepository.update(savedMovie.id, savedMovie);
  }
}