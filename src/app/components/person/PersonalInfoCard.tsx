import type { Person } from '@/interfaces';
import { getPerson } from '@/lib';
import { calculateCurrentAge, calculateDeathAge } from '@/utils';

interface Props {
  id: string;
}

export async function PersonalInfoCard({ id }: Props) {
  const person = (await getPerson(id)) as Person;
  const {
    name,
    birthday,
    deathday,
    gender,
    known_for_department,
    place_of_birth,
  } = person;

  const personalInfo = [
    {
      title: 'Know for',
      subtitle: known_for_department,
    },
    {
      title: 'Gender',
      subtitle:
        (gender === 0 && '-') ||
        (gender === 1 && 'Female') ||
        (gender === 2 && 'Male') ||
        (gender === 3 && 'Non-binary'),
    },
    birthday && {
      title: 'Birthday',
      subtitle: `${birthday}${
        !deathday
          ? ` (${calculateCurrentAge({ birthDate: birthday })} years old)`
          : ''
      }`,
    },
    deathday &&
      birthday && {
        title: 'Day of Death',
        subtitle: `${deathday}${` (${calculateDeathAge({
          birthDate: birthday,
          deathDate: deathday,
        })} years old)`}`,
      },
    place_of_birth && {
      title: 'Place of Birth',
      subtitle: place_of_birth,
    },
  ];

  return (
    <div className='mt-6'>
      <h2 className='block text-3xl font-semibold sm:hidden'>{name}</h2>
      <h3 className='my-3 text-xl font-semibold'>Personal Info</h3>
      <ul className='flex flex-col gap-4'>
        {personalInfo.map((info) => {
          if (!info) return;
          return (
            <li key={info.title}>
              <h4 className='font-semibold'>{info.title}</h4>
              <p>{info.subtitle}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
