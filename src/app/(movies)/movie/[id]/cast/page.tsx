import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { MovieCast, MovieCrew } from '@/components/movie';
import { getMovie, getMovieCast, getMovieCrew } from '@/lib';

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const movie = await getMovie(params.id);
  return {
    title: `${movie?.title} - Cast`,
    description: `View the cast of ${movie?.title}`,
  };
}

export default async function Page({ params }: Props) {
  const movie = await getMovie(params.id);
  if (!movie) redirect('/');

  const movieCast = await getMovieCast({ id: params.id });
  const movieCrew = await getMovieCrew({ id: params.id });

  const MOVIE_NOT_FOUND = '/assets/movieNotFound.svg';

  return (
    <div className='pt-[120px] sm:pt-[80px]'>
      <div className='p-6 md:p-8'>
        <section>
          <div className='flex flex-col items-center gap-6 sm:flex-row'>
            <figure className='h-[250px] w-[150px] rounded-md bg-purple-400 object-cover'>
              <Image
                className={`h-[250px] w-[150px] rounded-md ${
                  movie.poster_path ? 'object-cover' : ''
                }`}
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w300${movie?.poster_path}`
                    : MOVIE_NOT_FOUND
                }
                alt={movie?.title}
                height={150}
                width={150}
              />
            </figure>
            <div>
              <h4 className='text-center text-2xl font-semibold sm:text-left'>
                {`${movie?.title} ${
                  movie.release_date && `(${movie.release_date.slice(0, 4)})`
                }`}
              </h4>
              <Link
                href={`/movie/${params.id}`}
                className='mx-auto mt-4 block w-[140px] rounded-md border border-violet-600 bg-violet-600 py-3 text-center font-semibold text-white duration-200 ease-in-out sm:mx-0 md:hover:scale-110'
              >
                Back to main
              </Link>
            </div>
          </div>
        </section>
        <section className='mt-10'>
          <div className='flex flex-col gap-y-8 md:flex-row md:gap-x-8'>
            <div className='md:w-[50%]'>
              <h3 className='mb-6 text-xl font-semibold'>{`Cast (${movieCast.length})`}</h3>
              {movieCast.length > 0 ? (
                <MovieCast movieId={params.id} />
              ) : (
                `There are no cast records added to ${movie.title}.`
              )}
            </div>
            <div className='md:w-[50%]'>
              <h3 className='mb-6 text-xl font-semibold'>{`Crew (${movieCrew.length})`}</h3>
              {movieCrew.length > 0 ? (
                <MovieCrew movieId={params.id} />
              ) : (
                <p>{`There are no crew records added to ${movie.title}.`}</p>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
