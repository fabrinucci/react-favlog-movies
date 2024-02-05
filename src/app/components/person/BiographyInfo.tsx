'use client';

import { useState } from 'react';
import { separateBiography } from '@/utils';

interface Props {
  name: string;
  biography: string;
}

export const BiographyInfo = ({ name, biography }: Props) => {
  const [show, setShow] = useState(false);
  const newBio = separateBiography(biography);

  return (
    <div className='flex flex-col gap-3'>
      <h3 className='text-xl font-semibold'>Biography</h3>

      {(biography &&
        newBio.map((bio, index) => (
          <p
            className={`${!show && index >= 2 ? 'hidden' : ''} leading-7`}
            key={index}
          >
            {bio}
          </p>
        ))) || <p>{`We don't have biography for ${name}`}</p>}

      {biography && newBio.length > 2 && (
        <div className='flex place-self-end'>
          <button
            onClick={() => setShow(!show)}
            className='border-b border-purple-300 text-right text-purple-300'
          >
            {!show ? 'Read More' : 'Hide Text'}
          </button>
        </div>
      )}
    </div>
  );
};
