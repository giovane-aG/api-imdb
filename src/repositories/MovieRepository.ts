import { EntityRepository, Repository } from 'typeorm';
import { Movie } from '../entities/Movie';

@EntityRepository(Movie)
export class MovieRepository extends Repository<Movie> {}