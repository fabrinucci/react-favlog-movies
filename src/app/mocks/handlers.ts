import { MoviesResult } from '@/interfaces';
import { rest } from 'msw';

const Api = 'https://api.themoviedb.org/3';

export const handlers = [
  rest.get(`${Api}/movie/popular`, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json<MoviesResult[]>([]));
  }),
];
