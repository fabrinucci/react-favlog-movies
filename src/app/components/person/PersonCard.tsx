import Image from 'next/image';
import type { Person } from '@/interfaces';
import { getPerson } from '@/lib';
import { PersonMain, PersonalInfoCard } from './';

const NOT_FOUND_F = '/assets/profileFemaleNF.svg';
const NOT_FOUND_M = '/assets/profileMaleNF.svg';

interface Props {
  id: string;
}

export async function PersonCard({ id }: Props) {
  const person = (await getPerson(id)) as Person;
  const { gender, profile_path } = person;

  return (
    <div className='flex flex-col sm:flex-row sm:gap-6'>
      <section className='flex flex-col items-center sm:items-start'>
        <div className='mx-auto h-[275px] w-[200px] sm:mx-0 sm:h-[450px] sm:w-[300px]'>
          <figure className='h-full w-full rounded-md bg-purple-400'>
            <Image
              className='h-full w-full rounded-md object-cover'
              src={
                profile_path
                  ? `https://media.themoviedb.org/t/p/w300${profile_path}`
                  : gender === 1
                  ? NOT_FOUND_F
                  : NOT_FOUND_M
              }
              alt={person.name}
              height={200}
              width={200}
            />
          </figure>
        </div>

        <PersonalInfoCard id={id} />
      </section>

      <section>
        <PersonMain id={id} />
      </section>
    </div>
  );
}
