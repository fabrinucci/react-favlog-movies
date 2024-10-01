import { rest } from 'msw';
import { env } from '@/config';
import type {
  Genre,
  MovieCast,
  MovieCrew,
  MoviesResult,
  Person,
} from '@/interfaces';

import {
  mockedCategories,
  mockedMovieCast,
  mockedPerson,
  mockedPopularMovies,
} from './mockedResponse';

const { API_URL } = env;

export const handlers = [
  rest.get(`${API_URL}/movie/popular`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<MoviesResult[]>(mockedPopularMovies));
  }),

  rest.get(`${API_URL}/person/:id`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<Person>(mockedPerson));
  }),

  rest.get(`${API_URL}/genre/movie/list`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<Genre[]>(mockedCategories));
  }),

  rest.get(`${API_URL}/movie/:id/credits`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json<MovieCast[] | MovieCrew[]>(mockedMovieCast)
    );
  }),
];
