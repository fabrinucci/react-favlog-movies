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
    <div className='w-full'>
      <div className='flex flex-col items-center md:flex-row md:items-start md:gap-8'>
        <section className='flex max-w-[280px] flex-col items-center md:items-start'>
          <div className='mx-auto h-[245px] w-[200px] md:mx-0 md:h-[420px] md:w-[270px]'>
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

        <section className='w-full max-w-[950px]'>
          <PersonMain id={id} />
        </section>
      </div>
    </div>
  );
}
