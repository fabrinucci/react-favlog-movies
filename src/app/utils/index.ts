import { MoviesResult } from '../interfaces';

export const getRandomImage = (movies: MoviesResult[]) => {
  return Math.floor(Math.random() * movies?.length);
};

export const getYear = (movieRelease: string) => {
  return movieRelease.split('-')[0];
};

export const validatedPage = (page: number) => {
  if (isNaN(page)) return 1;
  if (page > 500) return 1;
  return page;
};

export const calculateCurrentAge = ({ birthDate }: { birthDate: string }) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  const [bYear, bMonth, bDay] = birthDate.split('-');
  const birthYear = Number(bYear);
  const birthMonth = Number(bMonth);
  const birthDay = Number(bDay);

  const currentAge = currentYear - birthYear;
  if (currentAge < 0) return 0;
  if (currentMonth < birthMonth) return currentAge - 1;
  if (currentMonth === birthMonth && currentDay < birthDay)
    return currentAge - 1;

  return currentAge;
};

export const calculateDeathAge = ({
  birthDate,
  deathDate,
}: {
  birthDate: string;
  deathDate: string;
}) => {
  const [bYear, bMonth, bDay] = birthDate.split('-');
  const birthYear = Number(bYear);
  const birthMonth = Number(bMonth);
  const birthDay = Number(bDay);

  const [dYear, dMonth, dDay] = deathDate.split('-');
  const deathYear = Number(dYear);
  const deathMonth = Number(dMonth);
  const deathDay = Number(dDay);

  const deathAge = deathYear - birthYear;
  if (deathMonth < birthMonth) return deathAge - 1;
  if (deathMonth === birthMonth && deathDay < birthDay) return deathAge - 1;

  return deathAge;
};

export const separateBiography = (biography: string) => {
  return biography.split('\n\n');
};
