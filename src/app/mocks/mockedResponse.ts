export const mockedPopularMovies = [
  {
    adult: false,
    backdrop_path: 'some text',
    genre_ids: [1, 5, 6],
    id: 15,
    original_language: 'some text',
    original_title: 'some text',
    overview: 'some text',
    popularity: 15,
    poster_path: 'some text',
    release_date: 'some text',
    title: 'Title',
    video: false,
    vote_average: 15,
    vote_count: 15,
  },
  {
    adult: true,
    backdrop_path: 'some text',
    genre_ids: [1, 5, 6],
    id: 25,
    original_language: 'some text',
    original_title: 'fe',
    overview: 'some text',
    popularity: 15,
    poster_path: 'some text',
    release_date: 'some text',
    title: 'Other Title',
    video: true,
    vote_average: 25,
    vote_count: 15,
  },
];

export const mockedMovieResult = {
  adult: false,
  backdrop_path: 'some text',
  genre_ids: [1, 5, 6],
  id: 19,
  original_language: 'English',
  original_title: 'Movie title test',
  overview: 'some text',
  popularity: 15,
  poster_path: 'some text',
  release_date: '25/09/2023',
  title: 'Movie title test',
  video: true,
  vote_average: 15,
  vote_count: 15,
};

export const mockedPerson = {
  adult: true,
  also_known_as: ['some text'],
  biography: 'some text',
  birthday: 'some text',
  deathday: 'some text',
  gender: 1,
  homepage: 'some text',
  id: 1,
  imdb_id: 'some text',
  known_for_department: 'some text',
  name: 'Person name',
  place_of_birth: 'some text',
  popularity: 1,
  profile_path: 'some text',
};

export const mockedMovies = {
  page: 1,
  results: mockedPopularMovies,
  total_pages: 3,
  total_results: 20,
};

export const mockedCategories = [
  {
    id: 1,
    name: 'Horror',
  },
  {
    id: 2,
    name: 'Animation',
  },
  {
    id: 3,
    name: 'Suspense',
  },
];

export const mockedCreditsCast = {
  adult: true,
  backdrop_path: 'some text',
  genre_ids: [1, 5, 9],
  id: 6,
  original_language: 'some text',
  original_title: 'some text',
  overview: 'some text',
  popularity: 6,
  poster_path: 'some text',
  release_date: 'some text',
  title: 'Movie Title Cast',
  video: true,
  vote_average: 6,
  vote_count: 6,
  character: 'some text',
  credit_id: 'some text',
  order: 6,
};

export const mockedCreditsCrew = {
  adult: true,
  backdrop_path: 'some text',
  genre_ids: [1, 5, 9],
  id: 6,
  original_language: 'some text',
  original_title: 'some text',
  overview: 'some text',
  popularity: 6,
  poster_path: 'some text',
  release_date: 'some text',
  title: 'Movie Title Crew',
  video: true,
  vote_average: 6,
  vote_count: 6,
  credit_id: 'some text',
  department: 'actor',
  job: 'actor',
};

export const mockedPersonCredits = {
  id: 5,
  cast: [mockedCreditsCast],
  crew: [mockedCreditsCrew],
};

export const mockedMovieCast = [
  {
    adult: true,
    gender: 6,
    id: 6,
    known_for_department: 'Title',
    name: 'Movie Title',
    original_name: 'Title',
    popularity: 6,
    profile_path: 'Title',
    cast_id: 6,
    character: 'Title',
    credit_id: 'Title',
    order: 6,
  },
];

export const mockedMovieCrew = [
  {
    adult: true,
    gender: 6,
    id: 6,
    known_for_department: 'Title',
    name: 'Movie Title',
    original_name: 'Title',
    popularity: 6,
    profile_path: 'Title',
    credit_id: 'Title',
    department: 'deparment',
    job: 'job',
  },
];

export const mockedMovieCrewFiltered = [
  {
    adult: true,
    gender: 6,
    id: 6,
    known_for_department: 'Title',
    name: 'Movie Title',
    original_name: 'Title',
    popularity: 6,
    profile_path: 'Title',
    credit_id: 'Title',
    department: 'deparment',
    job: ['job'],
  },
];

export const mockedFullMovie = {
  adult: true,
  backdrop_path: 'some text',
  belongs_to_collection: null,
  budget: 15,
  genres: [
    {
      id: 4,
      name: 'Horror',
    },
  ],
  homepage: 'some text',
  id: 15,
  imdb_id: 'some text',
  original_language: 'some text',
  original_title: 'some text',
  overview: 'some text',
  popularity: 15,
  poster_path: 'some text',
  production_companies: [
    {
      id: 4,
      logo_path: null,
      name: 'Name',
      origin_country: 'UK',
    },
  ],
  production_countries: [
    {
      iso_3166_1: '453',
      name: 'Name',
    },
  ],
  release_date: 'some text',
  revenue: 15,
  runtime: 15,
  spoken_languages: [
    {
      english_name: 'name',
      iso_639_1: 'name',
      name: 'name',
    },
  ],
  status: 'some text',
  tagline: 'some text',
  title: 'Full movie title',
  video: false,
  vote_average: 15,
  vote_count: 15,
};
