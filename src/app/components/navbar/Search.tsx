'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export const Search = () => {
  const WAIT_BETWEEN_CHANGE = 400;

  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams();
    if (term) {
      params.set('query', term);
      params.set('page', '1');
      router.push(`/search?${params.toString()}`);
    } else {
      params.delete('query');
      router.push('/');
    }
  }, WAIT_BETWEEN_CHANGE);

  return (
    <div>
      <input
        className='h-10 w-full rounded-md bg-[#f3d8ff] px-3 py-1 text-black transition-all placeholder:text-black hover:bg-[#f7e5ff] hover:outline-[#f7e5ff] focus:outline-1 focus:outline-[#f7e5ff] sm:w-56'
        type='text'
        placeholder='Search'
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
};
