import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { PersonCard } from '@/components/person';
import { getPerson } from '@/lib';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [id] = params.id.split('-');
  const person = await getPerson(id);
  return {
    title: person?.name,
    description: `View the info about ${person?.name}`,
  };
}

export default async function Page({ params }: Props) {
  const [id] = params.id.split('-');
  const person = await getPerson(id);
  if (!person) redirect('/');

  return (
    <section className='pt-[120px] sm:pt-[80px]'>
      <div className='p-6 md:p-8'>
        <PersonCard id={params.id} />
      </div>
    </section>
  );
}
