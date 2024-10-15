import { faker } from '@faker-js/faker';
import type {
  CreditCast,
  CreditCrew,
  MovieCast,
  MovieCrew,
  MovieCrewFiltered,
  PersonCredits,
} from '@/interfaces';

// Person credits

const generateMockedCreditsGlobal = () => ({
  adult: faker.datatype.boolean(),
  backdrop_path: `/${faker.string.nanoid()}.jpg`,
  genre_ids: faker.helpers.arrayElements([12, 16, 35, 80, 99, 218, 506], {
    min: 1,
    max: 4,
  }),
  id: faker.number.int(),
  original_language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
  original_title: faker.lorem.words({ min: 1, max: 6 }),
  overview: faker.lorem.paragraph({ min: 100, max: 1000 }),
  popularity: faker.number.float({ max: 10000, fractionDigits: 3 }),
  poster_path: `/${faker.string.nanoid()}.jpg`,
  release_date: faker.date.past().toISOString().split('T')[0],
  title: faker.lorem.words({ min: 1, max: 6 }),
  video: faker.datatype.boolean(),
  vote_average: faker.number.float({ min: 1, max: 10, fractionDigits: 3 }),
  vote_count: faker.number.int({ max: 50000 }),
  credit_id: faker.string.alphanumeric({ length: 10 }),
});

export const generateMockedCreditsCast = (): CreditCast => ({
  ...generateMockedCreditsGlobal(),
  character: faker.lorem.words({ min: 1, max: 3 }),
  order: faker.number.int({ min: 0, max: 100 }),
});

export const generateMockedCreditsCrew = (): CreditCrew => ({
  ...generateMockedCreditsGlobal(),
  department: faker.helpers.arrayElement([
    'Directing',
    'Production',
    'Writing',
  ]),
  job: faker.helpers.arrayElement([
    'Director',
    'Producer',
    'Screenplay',
    'Writer',
  ]),
});

export const generateMockedPersonCredits = (
  castLength: number,
  crewLength: number
): PersonCredits => ({
  id: faker.number.int(),
  cast: Array.from({ length: castLength }, () => generateMockedCreditsCast()),
  crew: Array.from({ length: crewLength }, () => generateMockedCreditsCrew()),
});

// MovieCredits

export const generateMockedMovieCreditsGlobal = () => ({
  adult: faker.datatype.boolean(),
  gender: faker.helpers.arrayElement([0, 1, 2, 3]),
  id: faker.number.int(),
  known_for_department: faker.helpers.arrayElement([
    'Directing',
    'Production',
    'Writing',
  ]),
  name: faker.person.fullName(),
  original_name: faker.person.fullName(),
  popularity: faker.number.float({ max: 10000, fractionDigits: 3 }),
  profile_path: `/${faker.string.nanoid()}.jpg`,
  cast_id: faker.number.int({ min: 1, max: 100 }),
  credit_id: faker.string.alphanumeric({ length: 10 }),
});

export const generateMockedMovieCreditsCast = (length: number): MovieCast[] =>
  Array.from({ length }, () => ({
    ...generateMockedMovieCreditsGlobal(),
    character: faker.lorem.words({ min: 1, max: 3 }),
    order: faker.number.int({ min: 0, max: 100 }),
  }));

export const generateMockedMovieCreditsCrew = (length: number): MovieCrew[] =>
  Array.from({ length }, () => ({
    ...generateMockedMovieCreditsGlobal(),
    department: faker.helpers.arrayElement([
      'Directing',
      'Production',
      'Writing',
    ]),
    job: faker.helpers.arrayElement([
      'Director',
      'Producer',
      'Screenplay',
      'Writer',
    ]),
  }));

export const generateMockedMovieCrewFiltered = (
  length: number
): MovieCrewFiltered[] =>
  Array.from({ length }, () => ({
    ...generateMockedMovieCreditsGlobal(),
    department: faker.helpers.arrayElement([
      'Directing',
      'Production',
      'Writing',
    ]),
    job: faker.helpers.arrayElements([
      'Director',
      'Producer',
      'Screenplay',
      'Writer',
    ]),
  }));
