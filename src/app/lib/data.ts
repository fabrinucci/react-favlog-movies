import type {
  Categories,
  MovieCredits,
  Movie,
  Movies,
  MoviesType,
  Person,
  PersonCredits,
} from '@/interfaces';
import { moviesApi } from './';
import { cache } from 'react';

interface MovieSearchProps {
  query: string;
  page: number;
}

interface MovieCastProps {
  id: string;
  start?: number;
  end?: number;
}

export const getHeroMovie = cache(async () => {
  try {
    const { data } = await moviesApi.get<Movies>('/movie/popular');
    const movie = data.results[0];
    return movie;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
});

export const getMovies = cache(async (type: MoviesType) => {
  try {
    const { data } = await moviesApi.get<Movies>(`/movie/${type}`);
    return data.results;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
});

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
    return data.crew;
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

export const getMoviesBySearch = async ({ query, page }: MovieSearchProps) => {
  try {
    const { data } = await moviesApi.get<Movies>(
      `search/movie?query=${query}&page=${page}`
    );
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch movies data.');
  }
};
