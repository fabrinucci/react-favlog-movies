import { Genre } from '@/interfaces';
import type {
  CreditCast,
  CreditCrew,
  CreditCrewFiltered,
  MovieCrew,
  MovieCrewFiltered,
} from '@/interfaces';

interface CategoryProps {
  id: string;
  categories: Genre[];
}

interface CalculateAgeProps {
  birthDate: string;
  deathDate?: string;
}

interface FilterCrewProps {
  movieCrew: MovieCrewFiltered[];
  job: string;
}

export const getYear = (movieRelease: string) => {
  return movieRelease.split('-')[0];
};

export const transformToUpperCase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const transformToSlug = (str: string) => {
  return str.toLowerCase().split(' ').join('-');
};

export const filterCrewByJob = ({ movieCrew, job }: FilterCrewProps) => {
  return movieCrew.filter((member) => member.job.includes(job));
};

export const getCategory = ({ id, categories }: CategoryProps) => {
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return null;

  const category = categories.find((c) => c.id === parsedId);
  return category || null;
};

export const validatePage = (page: number) => {
  if (isNaN(page)) return 1;
  if (page < 1) return 1;
  if (page > 500) return 1;
  return page;
};

export const separateBiography = (
  biography: string,
  delimiter: string = '\n\n'
) => {
  if (!biography || biography.trim() === '') return [];
  const sanitizedBiography = biography.trim();
  return sanitizedBiography.split(delimiter);
};

export const groupCrewJobs = (movies: MovieCrew[] | CreditCrew[]) => {
  const filteredCrew = movies.filter((movie, index) => {
    return index === movies.findIndex((m) => m.id === movie.id);
  });

  const crewJobs = filteredCrew.map((movie) => {
    const jobs = movies.filter((m) => m.id === movie.id).map((m) => m.job);
    return {
      ...movie,
      job: jobs,
    };
  });

  return crewJobs as MovieCrewFiltered[] | CreditCrewFiltered[];
};

export const calculateAge = ({ birthDate, deathDate }: CalculateAgeProps) => {
  const limitDate = deathDate ? new Date(deathDate) : new Date();
  const [bYear, bMonth, bDay] = birthDate.split('-').map(Number);

  const limitYear = limitDate.getFullYear();
  const limitMonth = limitDate.getMonth() + 1;
  const limitDay = limitDate.getDate();

  let age = limitYear - bYear;

  if (limitMonth < bMonth || (limitMonth === bMonth && limitDay < bDay)) {
    --age;
  }

  return Math.max(age, 0);
};

export const sortMovies = (movies: CreditCast[] | CreditCrew[]) => {
  return movies.sort((a, b) => {
    const dateA = a.release_date ? parseInt(a.release_date) : Infinity;
    const dateB = b.release_date ? parseInt(b.release_date) : Infinity;

    return dateB - dateA;
  });
};
