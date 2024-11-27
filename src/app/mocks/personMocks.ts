import { faker } from '@faker-js/faker';
import type { Person } from '@/interfaces';

export const generateMockedPerson = (): Person => ({
  adult: faker.datatype.boolean(),
  also_known_as: faker.helpers.arrayElements([faker.person.fullName()]),
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
  homepage: faker.helpers.arrayElement([faker.internet.url()]),
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
});
