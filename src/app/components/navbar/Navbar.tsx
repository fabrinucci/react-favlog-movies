import Link from 'next/link';
import { MdCameraRoll } from 'react-icons/md';
import { Account, Search } from './';

export const Navbar = () => {
  return (
    <nav className='absolute z-[100] flex w-full flex-col items-center justify-between gap-4 bg-transparent p-4 sm:flex-row sm:gap-0 md:px-8'>
      <Link href='/' className='flex items-center gap-2'>
        <h2 className='text-xl font-semibold text-white'>Favlog</h2>
        <MdCameraRoll color='white' />
      </Link>

      <div className='flex w-full items-center justify-evenly gap-3 sm:w-auto'>
        <Search />
        <Account />
      </div>
      <div className='hidden gap-2 sm:flex'>
        <button className='rounded-md border border-violet-600 bg-[#0000006b] px-5 py-2 text-white duration-200 ease-in-out hover:bg-[#000000b1]'>
          Sign In
        </button>
        <button className='rounded-md border border-violet-600 bg-violet-600 px-5 py-2 text-white duration-200 ease-in-out hover:bg-violet-700'>
          Sign Up
        </button>
      </div>
    </nav>
  );
};
