import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className='absolute bottom-0 flex h-20 w-full flex-col items-center justify-center bg-violet-800'>
      <div className='text-xl tracking-wide'>
        Make by
        <Link
          className='transition-all hover:opacity-75'
          href='https://github.com/fabrinucci'
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className='ml-1 font-semibold'>Fabrizio Nucci</span>
        </Link>
      </div>
    </footer>
  );
};
