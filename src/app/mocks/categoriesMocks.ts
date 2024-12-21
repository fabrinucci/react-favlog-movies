import { faker } from '@faker-js/faker';
import type { Genre } from '@/interfaces';

export const generateMockedCategory = (): Genre => ({
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
});

export const generateCategories = (length: number): Genre[] => {
  return Array.from({ length }, () => generateMockedCategory());
};
