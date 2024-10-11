import type {
  Categories,
  MovieCredits,
  Movie,
  Movies,
  MoviesType,
  Person,
  PersonCredits,
  MovieCrewFiltered,
} from '@/interfaces';
import { moviesApi } from './';
import { groupCrewJobs } from '@/utils';

interface MoviesSearchProps {
  query: string;
  page: number;
}

interface MoviesCategoryProps {
  categoryId: string;
  page: number;
}

interface MovieCastProps {
  id: string;
  start?: number;
  end?: number;
}

export const getHeroMovie = async () => {
  try {
    const { data } = await moviesApi.get<Movies>('/movie/popular');
    const movie = data.results[0];
    return movie;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
};

export const getMovies = async (type: MoviesType) => {
  try {
    const { data } = await moviesApi.get<Movies>(`/movie/${type}`);
    return data.results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
};

export const getMovie = async (id: string) => {
  try {
    const { data } = await moviesApi.get<Movie>(`/movie/${id}`);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
    throw new Error('Failed to fetch movie data.');
  }
};

export const getPerson = async (id: string) => {
  try {
    const { data } = await moviesApi.get<Person>(`/person/${id}`);
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
    throw new Error('Failed to fetch movie data.');
  }
};

export const getPersonCredits = async (id: string) => {
  try {
    const { data } = await moviesApi.get<PersonCredits>(
      `/person/${id}/movie_credits`
    );
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    return null;
    throw new Error('Failed to fetch movie data.');
  }
};

export const getMovieCrew = async ({ id }: { id: string }) => {
  try {
    const { data } = await moviesApi.get<MovieCredits>(`/movie/${id}/credits`);
    const filteredCrew = groupCrewJobs(data.crew);
    return filteredCrew as MovieCrewFiltered[];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movie data.');
  }
};

export const getMovieCast = async ({ id, start, end }: MovieCastProps) => {
  try {
    const { data } = await moviesApi.get<MovieCredits>(`/movie/${id}/credits`);
    if (typeof start === 'number') {
      return data.cast.slice(start, end);
    }
    return data.cast;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movie data.');
  }
};

export const getCategories = async () => {
  try {
    const { data } = await moviesApi.get<Categories>('/genre/movie/list');
    return data.genres;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories data.');
  }
};

export const getMoviesByCategory = async ({
  categoryId,
  page,
}: MoviesCategoryProps) => {
  try {
    const { data } = await moviesApi.get<Movies>(
      `/discover/movie?with_genres=${categoryId}&page=${page || 1}`
    );

    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
};

export const getMoviesBySearch = async ({ query, page }: MoviesSearchProps) => {
  try {
    const { data } = await moviesApi.get<Movies>(
      `search/movie?query=${query}&page=${page || 1}`
    );
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
};
