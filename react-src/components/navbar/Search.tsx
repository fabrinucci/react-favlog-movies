import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';
import { useSearchParams } from 'react-router-dom';

export const Search = () => {
  const [search, setSearch] = useState<string>('');
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`search?query=${search}`);
    setSearch('');
  };
  return (
    <form onSubmit={handleSearch}>
      <input
        className='h-8 w-40 rounded-md bg-[rgba(250,250,250,0.5)] px-3 py-1 text-black transition-all placeholder:text-black hover:bg-slate-200 hover:outline-slate-200 focus:outline-1 focus:outline-slate-200 sm:h-10 sm:w-56'
        type='text'
        placeholder='Search'
        onChange={handleChange}
        name='search'
        value={search}
      />
    </form>
  );
};
