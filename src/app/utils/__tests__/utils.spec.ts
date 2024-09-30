import type { CreditCast, MovieCrew, MovieCrewFiltered } from '@/interfaces';
import {
  calculateAge,
  filterCrewByJob,
  formatStrings,
  getCategory,
  getYear,
  groupCrewJobs,
  separateBiography,
  sortMovies,
  transformToSlug,
  transformToUpperCase,
  validatePage,
} from '../';

describe('Testing utils', () => {
  describe('Testing getYear()', () => {
    test('Should return the year correctly', () => {
      expect(getYear('2005-06-08')).toBe('2005');
    });

    test('Should return the original string if format is not as expected', () => {
      expect(getYear('2020')).toBe('2020');
    });
  });

  describe('Testing transformToSlug()', () => {
    test('Should transform string to slug format', () => {
      expect(transformToSlug('The new order')).toBe('the-new-order');
      expect(transformToSlug('the-new order 2')).toBe('the-new-order-2');
      expect(transformToSlug('STAR WARS')).toBe('star-wars');
      expect(transformToSlug('STAR WARS-iv')).toBe('star-wars-iv');
    });

    test('Should return an empty string', () => {
      expect(transformToSlug('')).toBe('');
    });

    test('Should return the same string', () => {
      expect(transformToSlug('order')).toBe('order');
    });

    test('Should transform with multiple spaces', () => {
      expect(transformToSlug('New   order')).toBe('new---order');
    });
  });

  describe('Testing transformToUpperCase()', () => {
    test('Should capitalize the first letter', () => {
      expect(transformToUpperCase('order')).toBe('Order');
    });

    test('Should return an empty string', () => {
      expect(transformToUpperCase('')).toBe('');
    });

    test('Should work with a single character', () => {
      expect(transformToUpperCase('a')).toBe('A');
    });

    test('Should return the same string', () => {
      expect(transformToUpperCase('The new order')).toBe('The new order');
    });
  });

  describe('Testing formatString()', () => {
    test('Should join multiple strings with a comma and space', () => {
      const str = ['Director', 'Producer', 'Writer'];
      const result = formatStrings(str);
      expect(result).toBe('Director, Producer, Writer');
    });

    test('Should return a single string without a comma', () => {
      const str = ['Director'];
      const result = formatStrings(str);
      expect(result).toBe('Director');
    });

    test('Should return an empty string', () => {
      const result = formatStrings([]);
      expect(result).toBe('');
    });
  });

  describe('Testing filterCrewByJob()', () => {
    const movieCrew = [
      { id: 1, name: 'John Doe', job: ['Director', 'Producer'] },
      { id: 2, name: 'Jane Smith', job: ['Writer'] },
      { id: 3, name: 'Sam Brown', job: ['Producer'] },
      { id: 4, name: 'Alex Green', job: ['Director'] },
    ] as MovieCrewFiltered[];

    test('Should return only members with the "Director" job', () => {
      const result = filterCrewByJob({ movieCrew, job: 'Director' });

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 1, name: 'John Doe', job: ['Director', 'Producer'] },
        { id: 4, name: 'Alex Green', job: ['Director'] },
      ]);
    });

    test('Should return only members with the "Producer" job', () => {
      const result = filterCrewByJob({ movieCrew, job: 'Producer' });

      expect(result).toHaveLength(2);
      expect(result).toEqual([
        { id: 1, name: 'John Doe', job: ['Director', 'Producer'] },
        { id: 3, name: 'Sam Brown', job: ['Producer'] },
      ]);
    });

    test('Should return only members with the "Writer" job', () => {
      const result = filterCrewByJob({ movieCrew, job: 'Writer' });

      expect(result).toHaveLength(1);
      expect(result).toEqual([{ id: 2, name: 'Jane Smith', job: ['Writer'] }]);
    });

    test('Should return an empty array', () => {
      const result = filterCrewByJob({ movieCrew, job: 'Composer' });
      const result2 = filterCrewByJob({ movieCrew: [], job: 'Director' });

      expect(result).toHaveLength(0);
      expect(result2).toHaveLength(0);
    });
  });

  describe('Testing separateBiography()', () => {
    test('Should separate paragraphs by double newline', () => {
      const biography = 'This is paragraph one.\n\nThis is paragraph two.';
      const result = separateBiography(biography);
      expect(result).toEqual([
        'This is paragraph one.',
        'This is paragraph two.',
      ]);
    });

    test('Should work with custom delimiter', () => {
      const biography = 'Paragraph one.***Paragraph two.';
      const result = separateBiography(biography, '***');
      expect(result).toEqual(['Paragraph one.', 'Paragraph two.']);
    });

    test('Should not have a space at the beginning', () => {
      expect(separateBiography(' Paragraph one.')).toEqual(['Paragraph one.']);
    });

    test('Should return an empty array', () => {
      expect(separateBiography('')).toEqual([]);
    });
  });

  describe('Testing getCategory()', () => {
    test('Should return the correct category', () => {
      const categories = [
        { id: 1, name: 'Action' },
        { id: 2, name: 'Drama' },
        { id: 3, name: 'Horror' },
      ];
      expect(getCategory({ id: '1', categories })).toEqual({
        id: 1,
        name: 'Action',
      });
    });

    test('Should return null for invalid category id', () => {
      const categories = [{ id: 1, name: 'Action' }];
      expect(getCategory({ id: '999', categories })).toBeNull();
    });

    test('Should return null when no id is received.', () => {
      const categories = [{ id: 1, name: 'Action' }];
      expect(getCategory({ id: 'abc', categories })).toBeNull();
    });
  });

  describe('Testing validatePage()', () => {
    test('Should return the same page if it is valid', () => {
      expect(validatePage(2)).toBe(2);
      expect(validatePage(10)).toBe(10);
      expect(validatePage(100)).toBe(100);
      expect(validatePage(250)).toBe(250);
      expect(validatePage(500)).toBe(500);
    });

    test('Should return 1 if page is less than 1', () => {
      expect(validatePage(0)).toBe(1);
      expect(validatePage(-2)).toBe(1);
    });

    test('Should return 1 if page is greater than 500', () => {
      expect(validatePage(501)).toBe(1);
      expect(validatePage(600)).toBe(1);
    });

    test('Should return 1 if page is not a number', () => {
      expect(validatePage(NaN)).toBe(1);
    });
  });

  describe('Testing groupCrewJobs()', () => {
    test('Should group the jobs', () => {
      const movies = [
        { id: 1, job: 'Director' },
        { id: 1, job: 'Producer' },
        { id: 2, job: 'Actor' },
      ];

      const result = groupCrewJobs(movies as MovieCrew[]);

      expect(result).toEqual([
        { id: 1, job: ['Director', 'Producer'] },
        { id: 2, job: ['Actor'] },
      ]);
    });
  });

  describe('Testing calculateAge()', () => {
    test('Should calculate age correctly', () => {
      expect(calculateAge({ birthDate: '1990-01-01' })).toBe(
        new Date().getFullYear() - 1990
      );
    });

    test('Should return 0 for future birth dates', () => {
      expect(calculateAge({ birthDate: '3000-01-01' })).toBe(0);
    });

    test('Should calculate death age correctly', () => {
      expect(
        calculateAge({ birthDate: '1990-05-01', deathDate: '2020-01-01' })
      ).toBe(29);

      expect(
        calculateAge({ birthDate: '1990-05-01', deathDate: '2020-05-04' })
      ).toBe(30);
    });
  });

  describe('Testing sortMovies()', () => {
    test('Should sort movies with release dates in descending order', () => {
      const movies = [
        { title: 'Movie A', release_date: '2020-05-10' },
        { title: 'Movie B', release_date: '2019-06-15' },
        { title: 'Movie C', release_date: '2021-01-20' },
      ];

      const sortedMovies = sortMovies(movies as CreditCast[]);
      expect(sortedMovies).toEqual([
        { title: 'Movie C', release_date: '2021-01-20' },
        { title: 'Movie A', release_date: '2020-05-10' },
        { title: 'Movie B', release_date: '2019-06-15' },
      ]);
    });

    test('Should place movies without release date at the beginning', () => {
      const movies = [
        { title: 'Movie A', release_date: '2020-05-10' },
        { title: 'Movie B' },
        { title: 'Movie C', release_date: '2021-01-20' },
        { title: 'Movie D' },
      ];

      const sortedMovies = sortMovies(movies as CreditCast[]);
      expect(sortedMovies).toEqual([
        { title: 'Movie B' },
        { title: 'Movie D' },
        { title: 'Movie C', release_date: '2021-01-20' },
        { title: 'Movie A', release_date: '2020-05-10' },
      ]);
    });

    test('Should handle an empty array', () => {
      const movies: { release_date?: string }[] = [];

      const sortedMovies = sortMovies(movies as []);
      expect(sortedMovies).toEqual([]);
    });

    test('Should handle movies null release dates', () => {
      const movies = [
        { title: 'Movie A', release_date: '2020-05-10' },
        { title: 'Movie B', release_date: null },
        { title: 'Movie D', release_date: '2021-06-15' },
      ];

      const sortedMovies = sortMovies(movies as CreditCast[]);

      expect(sortedMovies).toEqual([
        { title: 'Movie B', release_date: null },
        { title: 'Movie D', release_date: '2021-06-15' },
        { title: 'Movie A', release_date: '2020-05-10' },
      ]);
    });
  });
});
