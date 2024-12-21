import type { Person } from '@/interfaces';
import { getPerson } from '@/lib';
import { calculateAge } from '@/utils';

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
      title: 'Known for',
      subtitle: known_for_department,
      id: 'known-for',
    },
    {
      title: 'Gender',
      subtitle:
        (gender === 0 && '-') ||
        (gender === 1 && 'Female') ||
        (gender === 2 && 'Male') ||
        (gender === 3 && 'Non-binary'),
      id: 'gender',
    },
    birthday && {
      title: 'Birthday',
      subtitle: `${birthday}${
        !deathday ? ` (${calculateAge({ birthDate: birthday })} years old)` : ''
      }`,
      id: 'birthday',
    },
    deathday &&
      birthday && {
        title: 'Day of Death',
        subtitle: `${deathday}${` (${calculateAge({
          birthDate: birthday,
          deathDate: deathday,
        })} years old)`}`,
        id: 'deathday',
      },
    place_of_birth && {
      title: 'Place of Birth',
      subtitle: place_of_birth,
      id: 'place-birth',
    },
  ];

  return (
    <div data-testid='PersonalInfoCard' className='mt-6'>
      <h2
        data-testid='PersonalInfoCard-name'
        className='block text-3xl font-semibold sm:hidden'
      >
        {name}
      </h2>
      <h3 className='my-3 text-xl font-semibold'>Personal Info</h3>
      <ul data-testid='PersonalInfoCard-ul' className='flex flex-col gap-4'>
        {personalInfo.map((info) => {
          if (!info) return;
          return (
            <li data-testid={`PersonalInfoCard-li-${info.id}`} key={info.title}>
              <h4
                data-testid={`PersonalInfoCard-li-title-${info.id}`}
                className='font-semibold'
              >
                {info.title}
              </h4>
              <p data-testid={`PersonalInfoCard-li-subtitle-${info.id}`}>
                {info.subtitle}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
