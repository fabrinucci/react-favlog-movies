import { Person } from '@/interfaces';
import { getPerson } from '@/lib';
import { BiographyInfo } from './';

interface Props {
  id: string;
}

export async function PersonMain({ id }: Props) {
  const person = (await getPerson(id)) as Person;
  const { biography, name } = person;

  return (
    <div className='mt-6 flex flex-col gap-3 sm:mt-0 sm:items-start'>
      <h2 className='hidden text-4xl font-semibold sm:block'>{name}</h2>
      <BiographyInfo name={name} biography={biography} />
    </div>
  );
}
