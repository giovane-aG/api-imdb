
export class MovieService {
  private readonly movieRepository;

  constructor(movieRepository) {
    this.movieRepository = movieRepository;
  }

  async getMovie({ id, title, description, director, gender }) {
    
    
    let query = this.movieRepository.createQueryBuilder('movie')

    if (id) {
      query = query.where('movie.id = :id', { id });
    }

    if (title) {
      query = query.andWhere('movie.title = :title', { title });
    }

    if (description) {
      query = query.andWhere('movie.description = :description', { description });
    }

    if (director) {
      query = query.andWhere('movie.director = :director', { director });
    }

    if (gender) {
      query = query.andWhere('movie.gender = :gender', { gender });
    }

    return await query.getMany();
  }


  async createMovie(movie) {
    const { title, description, director, gender } = movie;

    if (!title) throw new Error('Title is required');
    if (!description) throw new Error('Description is required');
    if (!director) throw new Error('Director is required');
    if (!gender) throw new Error('Gender is required');

    if (typeof title !== 'string') throw new Error('Title must be a string');
    if (typeof gender !== 'string') throw new Error('Gender must be a string');
    if (typeof director !== 'string') throw new Error('Director must be a string');
    if (typeof description !== 'string') throw new Error('Description must be a string');

    const newMovie = this.movieRepository.create({
      title,
      description,
      director,
      gender
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