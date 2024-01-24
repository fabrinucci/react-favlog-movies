import Image from 'next/image';
import Link from 'next/link';

export default function Custom404() {
  return (
    <div className='flex h-screen w-full flex-col items-center justify-center gap-6'>
      <figure>
        <Image src='/assets/pageNotFound.svg' alt='' width={250} height={250} />
      </figure>
      <h1 className='text-2xl'>
        {"We can't find the page you're looking for"}
      </h1>

      <Link
        href='/'
        className='rounded-md border border-violet-600 bg-violet-600 px-6 py-4 font-semibold text-white duration-200 ease-in-out md:hover:scale-110'
      >
        Go Home
      </Link>
    </div>
  );
}
