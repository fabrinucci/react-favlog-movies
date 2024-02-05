import type { Person, PersonCredits } from '@/interfaces';
import { getPerson, getPersonCredits } from '@/lib';
import { BiographyInfo, PersonMoviesCard } from './';

interface Props {
  id: string;
}

export async function PersonMain({ id }: Props) {
  const person = (await getPerson(id)) as Person;
  const personCredits = await getPersonCredits(id);
  const { biography, name } = person;
  const { cast, crew } = personCredits as PersonCredits;

  return (
    <div className='mt-6 md:mt-0'>
      <h2 className='hidden text-4xl font-semibold md:mb-6 md:block'>{name}</h2>
      <div className='flex flex-col gap-6'>
        <BiographyInfo name={name} biography={biography} />

        <div className='flex flex-col gap-3'>
          <h3 className='text-xl font-semibold'>Known For</h3>
          <ul className='grid grid-cols-fill-2 justify-center gap-3 lg:gap-6'>
            {(person.known_for_department === 'Acting' ? cast : crew)
              .sort((a, b) => b.popularity - a.popularity)
              .slice(0, 6)
              .map((castMovie) => (
                <PersonMoviesCard key={castMovie.id} credits={castMovie} />
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
