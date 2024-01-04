'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { MovieCredits } from '@/interfaces';

interface Props {
  movieCredits: MovieCredits;
}

const CAST_IMG = 'https://image.tmdb.org/t/p/w300';
const NOT_FOUND_IMG = '/assets/profileNotFound.webp';

export const MovieCast = ({ movieCredits }: Props) => {
  const [showAllCast, setShowAllCast] = useState(false);

  let moviesCast;

  if (showAllCast) {
    moviesCast = movieCredits?.cast;
  } else {
    moviesCast = movieCredits?.cast.slice(0, 6);
  }

  const onToggleCast = () => {
    setShowAllCast(!showAllCast);
  };

  return (
    <section className='py-10 md:py-6'>
      <div className='mt-3'>
        <div className='flex items-center justify-between pb-3'>
          <h3 className='text-xl font-semibold'>Cast:</h3>
          {movieCredits?.cast.length! > 6 && (
            <button
              onClick={onToggleCast}
              className='rounded-md bg-violet-600 px-4 py-1 font-semibold text-gray-200 md:py-2'
            >
              {showAllCast ? 'Hide cast' : 'Show all cast'}
            </button>
          )}
        </div>
        <ul
          className={`grid grid-cols-1 justify-items-center gap-2 min-[400px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6`}
        >
          {moviesCast?.map((profileCast) => (
            <li
              className='flex animate-fadeIn flex-col items-center justify-center'
              key={profileCast.id}
            >
              <div className='my-2 h-60 w-40 rounded-md bg-gray-600'>
                <Image
                  className='h-60 w-40 rounded-md object-cover'
                  src={
                    profileCast.profile_path
                      ? `${CAST_IMG}${profileCast.profile_path}`
                      : NOT_FOUND_IMG
                  }
                  alt={profileCast.name}
                  height={300}
                  width={300}
                />
              </div>
              <h4>
                {profileCast.name?.length! <= 22
                  ? profileCast.name
                  : `${profileCast.name?.slice(0, 22)}...`}
              </h4>
              <h5 className='text-sm text-gray-300'>
                {profileCast.character?.length! <= 22
                  ? profileCast.character
                  : `${profileCast.character?.slice(0, 22)}...`}
              </h5>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
