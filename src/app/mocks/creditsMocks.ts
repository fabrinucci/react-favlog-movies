import { faker } from '@faker-js/faker';
import type {
  CreditCast,
  CreditCrew,
  CreditCrewFiltered,
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
  overview: faker.lorem.paragraph({ min: 1, max: 5 }),
  popularity: faker.number.float({ max: 10000, fractionDigits: 3 }),
  poster_path: `/${faker.string.nanoid()}.jpg`,
  release_date: faker.date.past().toISOString().split('T')[0],
  title: faker.lorem.words({ min: 1, max: 6 }),
  video: faker.datatype.boolean(),
  vote_average: faker.number.float({ min: 1, max: 10, fractionDigits: 3 }),
  vote_count: faker.number.int({ max: 50000 }),
  credit_id: faker.string.alphanumeric({ length: 10 }),
});

export const generateMockedCreditCast = (): CreditCast => ({
  ...generateMockedCreditsGlobal(),
  character: faker.lorem.words({ min: 1, max: 3 }),
  order: faker.number.int({ min: 0, max: 100 }),
});

export const generateMockedCreditCrew = (): CreditCrew => ({
  ...generateMockedCreditsGlobal(),
  department: faker.helpers.arrayElement([
    'Directing',
    'Production',
    'Writing',
  ]),
  job: faker.helpers.arrayElement(['Director', 'Producer', 'Writer']),
});

export const generateMockedCreditCrewFiltered = (): CreditCrewFiltered => ({
  ...generateMockedCreditCrew(),
  job: faker.helpers.arrayElements(['Director', 'Producer', 'Writer']),
});

export const generateMockedCredits = (
  length: number,
  type: 'cast' | 'crew'
): CreditCast[] | CreditCrewFiltered[] => {
  if (type === 'cast')
    return Array.from({ length }, () => generateMockedCreditCast());
  if (type === 'crew')
    return Array.from({ length }, () => generateMockedCreditCrewFiltered());
  return [];
};
// }

export const generateMockedPersonCredits = (
  castLength: number,
  crewLength: number
): PersonCredits => ({
  id: faker.number.int(),
  cast:
    castLength > 0
      ? Array.from({ length: castLength }, () => generateMockedCreditCast())
      : [],
  crew: crewLength
    ? Array.from({ length: crewLength }, () => generateMockedCreditCrew())
    : [],
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
  name: faker.person.lastName(),
  original_name: faker.person.fullName(),
  popularity: faker.number.float({ max: 10000, fractionDigits: 3 }),
  profile_path: `/${faker.string.nanoid()}.jpg`,
  cast_id: faker.number.int({ min: 1, max: 100 }),
  credit_id: faker.string.alphanumeric({ length: 10 }),
});

export const generateMockedMovieCreditsCast = (length: number): MovieCast[] =>
  Array.from({ length }, () => ({
    ...generateMockedMovieCreditsGlobal(),
    character: faker.lorem.word(),
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
    job: faker.helpers.arrayElement(['Director', 'Producer', 'Writer']),
  }));

export const generateMockedMovieCreditsCrewF = (
  length: number
): MovieCrewFiltered[] =>
  Array.from({ length }, () => ({
    ...generateMockedMovieCreditsGlobal(),
    department: faker.helpers.arrayElement([
      'Directing',
      'Production',
      'Writing',
    ]),
    job: faker.helpers.arrayElements(['Director', 'Producer', 'Writer']),
  }));
