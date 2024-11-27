import { faker } from '@faker-js/faker';
import type { Movie, Movies, MoviesResult } from '@/interfaces';
import { generateCategories } from './categoriesMocks';

export const generateMockedMovie = (): MoviesResult => ({
  adult: faker.datatype.boolean(),
  backdrop_path: `/${faker.string.nanoid()}.jpg`,
  genre_ids: faker.helpers.arrayElements([12, 16, 35, 80, 99, 218, 506], {
    min: 1,
    max: 3,
  }),
  id: faker.number.int(),
  original_language: faker.helpers.arrayElement(['en', 'es', 'fr', 'de']),
  original_title: faker.lorem.words({ min: 1, max: 6 }),
  overview: faker.lorem.words(10),
  popularity: faker.number.float({ max: 10000, fractionDigits: 3 }),
  poster_path: `/${faker.string.nanoid()}.jpg`,
  release_date: faker.date.past().toISOString().split('T')[0],
  title: faker.lorem.words({ min: 1, max: 6 }),
  video: faker.datatype.boolean(),
  vote_average: faker.number.float({ min: 1, max: 10, fractionDigits: 3 }),
  vote_count: faker.number.int({ max: 50000 }),
});

export const generateMockedMovies = (length: number): MoviesResult[] => {
  return Array.from({ length }, () => generateMockedMovie());
};

export const generateMockedFullMovies = (): Movies => ({
  page: faker.number.int({ min: 1, max: 199 }),
  results: generateMockedMovies(20),
  total_pages: faker.number.int({ min: 200, max: 400 }),
  total_results: faker.number.int({ min: 5000, max: 20000 }),
});

export const generateMockedFullMovie = (): Movie => ({
  adult: faker.datatype.boolean(),
  backdrop_path: `/${faker.string.nanoid()}.jpg`,
  belongs_to_collection: null,
  budget: faker.number.int({ min: 100000, max: 1000000000 }),
  genres: faker.helpers.arrayElements(generateCategories(4), {
    min: 1,
    max: 4,
  }),
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
  release_date: faker.date.past().toISOString().split('T')[0],

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
});
