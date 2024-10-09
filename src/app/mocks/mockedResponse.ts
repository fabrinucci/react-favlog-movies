import {
  CreditCast,
  CreditCrew,
  Genre,
  Movie,
  MovieCast,
  MovieCrew,
  MovieCrewFiltered,
  Movies,
  MoviesResult,
  Person,
  PersonCredits,
} from '@/interfaces';
import { faker } from '@faker-js/faker';

export const mockedMovie: MoviesResult = {
  adult: faker.datatype.boolean(),
  backdrop_path: `/${faker.string.nanoid()}.jpg`,
  genre_ids: faker.helpers.arrayElements([12, 16, 35, 80, 99, 218, 506], {
    min: 1,
    max: 3,
  }),
  id: faker.number.int(),
  original_language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
  original_title: faker.lorem.words({ min: 1, max: 6 }),
  overview: faker.lorem.paragraph({ min: 100, max: 1000 }),
  popularity: faker.number.float({ max: 10000, fractionDigits: 3 }),
  poster_path: `/${faker.string.nanoid()}.jpg`,
  release_date: faker.date.anytime().toISOString().split('T')[0],
  title: faker.lorem.words({ min: 1, max: 6 }),
  video: faker.datatype.boolean(),
  vote_average: faker.number.float({ min: 1, max: 10, fractionDigits: 3 }),
  vote_count: faker.number.int({ max: 50000 }),
};

export const mockedPerson: Person = {
  adult: faker.datatype.boolean(),
  also_known_as: faker.helpers.arrayElements([faker.person.fullName()], {
    min: 1,
    max: 4,
  }),
  biography: faker.person.bio(),
  birthday: faker.date
    .birthdate({ mode: 'year', min: 1960, max: 2000 })
    .toISOString()
    .split('T')[0],
  deathday: faker.date
    .birthdate({ mode: 'year', min: 2010, max: 2020 })
    .toISOString()
    .split('T')[0],
  gender: faker.helpers.arrayElement([0, 1, 2, 3]),
  homepage: faker.helpers.arrayElement([faker.internet.url(), null]),
  id: faker.number.int(),
  imdb_id: faker.string.uuid(),
  known_for_department: faker.helpers.arrayElement([
    'Acting',
    'Directing',
    'Production',
    'Writing',
  ]),
  name: faker.person.fullName(),
  place_of_birth: faker.location.city(),
  popularity: faker.number.float({ max: 10000, fractionDigits: 3 }),
  profile_path: `/${faker.string.nanoid()}.jpg`,
};

export const mockedCategory: Genre = {
  id: faker.number.int(),
  name: faker.helpers.arrayElement([
    'Action',
    'Animation',
    'Drama',
    'Horror',
    'Mystery',
    'Romance',
    'Suspense',
    'Thriller',
  ]),
};

export const mockedPopularMovies: MoviesResult[] = faker.helpers.arrayElements(
  [mockedMovie],
  20
);

export const mockedMovies: Movies = {
  page: faker.number.int({ min: 1, max: 500 }),
  results: mockedPopularMovies,
  total_pages: faker.number.int({ min: 1, max: 500 }),
  total_results: faker.number.int({ min: 1, max: 20 }),
};

export const mockedCategories: Genre[] = faker.helpers.arrayElements(
  [mockedCategory],
  8
);

const mockedCreditsGlobal = {
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
  release_date: faker.date.anytime().toISOString().split('T')[0],
  title: faker.lorem.words({ min: 1, max: 6 }),
  video: faker.datatype.boolean(),
  vote_average: faker.number.float({ min: 1, max: 10, fractionDigits: 3 }),
  vote_count: faker.number.int({ max: 50000 }),
  credit_id: faker.string.alphanumeric({ length: 10 }),
};

export const mockedCreditsCast: CreditCast = {
  ...mockedCreditsGlobal,
  character: faker.lorem.words({ min: 1, max: 3 }),
  order: faker.number.int({ min: 0, max: 100 }),
};

export const mockedCreditsCrew: CreditCrew = {
  ...mockedCreditsGlobal,
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
};

export const mockedPersonCredits: PersonCredits = {
  id: faker.number.int(),
  cast: faker.helpers.arrayElements([mockedCreditsCast], { min: 1, max: 30 }),
  crew: faker.helpers.arrayElements([mockedCreditsCrew], { min: 1, max: 30 }),
};

export const mockedMovieCreditsGlobal = {
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
};

export const mockedMovieCreditsCast: MovieCast[] = [
  {
    ...mockedMovieCreditsGlobal,
    character: faker.lorem.words({ min: 1, max: 3 }),
    order: faker.number.int({ min: 0, max: 100 }),
  },
];

export const mockedMovieCreditsCrew: MovieCrew[] = [
  {
    ...mockedMovieCreditsGlobal,
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
  },
];

export const mockedMovieCrewFiltered: MovieCrewFiltered[] = [
  {
    ...mockedMovieCreditsGlobal,
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
  },
];

export const mockedFullMovie: Movie = {
  adult: faker.datatype.boolean(),
  backdrop_path: `/${faker.string.nanoid()}.jpg`,
  belongs_to_collection: null,
  budget: faker.number.int({ min: 100000, max: 1000000000 }),
  genres: faker.helpers.arrayElements([mockedCategory], { min: 1, max: 4 }),
  homepage: faker.internet.url(),
  id: faker.number.int(),
  imdb_id: faker.string.alphanumeric(10),
  original_language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
  original_title: faker.lorem.words({ min: 1, max: 6 }),
  overview: faker.lorem.paragraphs({ min: 1, max: 5 }),
  popularity: faker.number.float({ max: 10000, fractionDigits: 3 }),
  poster_path: `/${faker.string.nanoid()}.jpg`,
  production_companies: faker.helpers.arrayElements(
    [
      {
        id: faker.number.int(),
        logo_path: null,
        name: faker.company.name(),
        origin_country: faker.helpers.arrayElement([
          'CA',
          'FR',
          'DE',
          'US',
          'UK',
        ]),
      },
    ],
    { min: 1, max: 3 }
  ),
  production_countries: faker.helpers.arrayElements([
    {
      iso_3166_1: faker.helpers.arrayElement(['CA', 'FR', 'DE', 'US', 'UK']),
      name: faker.helpers.arrayElement([
        'Canada',
        'France',
        'Germany',
        'United States',
        'United Kingdom',
      ]),
    },
  ]),
  release_date: faker.date.anytime().toISOString().split('T')[0],

  revenue: faker.number.int({ min: 100000, max: 1000000000 }),
  runtime: faker.number.int({ max: 500 }),
  spoken_languages: faker.helpers.arrayElements([
    {
      english_name: faker.helpers.arrayElement([
        'English',
        'French',
        'German',
        'Spanish',
      ]),
      iso_639_1: faker.helpers.arrayElement(['en', 'de', 'fr', 'es']),
      name: faker.helpers.arrayElement([
        'English',
        'French',
        'German',
        'Spanish',
      ]),
    },
  ]),
  status: faker.helpers.arrayElement([
    'Planned',
    'Post Production',
    'Released',
  ]),
  tagline: faker.lorem.sentence(),
  title: faker.lorem.words({ min: 1, max: 6 }),
  video: faker.datatype.boolean(),
  vote_average: faker.number.float({ min: 1, max: 10, fractionDigits: 3 }),
  vote_count: faker.number.int({ max: 50000 }),
};
