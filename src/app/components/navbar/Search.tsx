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
      router.push(`/search?${params.toString()}`);
    } else {
      params.delete('query');
      router.push('/');
    }
  }, WAIT_BETWEEN_CHANGE);

  return (
    <div>
      <input
        className='h-8 w-40 rounded-md bg-[rgba(250,250,250,0.5)] px-3 py-1 text-black transition-all placeholder:text-black hover:bg-slate-200 hover:outline-slate-200 focus:outline-1 focus:outline-slate-200 sm:h-10 sm:w-56'
        type='text'
        placeholder='Search'
        onChange={(e) => handleChange(e.target.value)}
        defaultValue={searchParams.get('query')?.toString()}
      />
    </div>
  );
};
