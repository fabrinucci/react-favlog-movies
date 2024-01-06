export const SearchMovieSkeleton = () => {
  return (
    <>
      <div className='h-[120px] w-full bg-gray-950 sm:h-[80px]'></div>
      <div className='animate-loading px-4 py-4 md:px-8'>
        <div className='mb-4 h-9 w-64 rounded-full bg-gray-600'></div>
        <div className='flex gap-4'>
          <span className='h-56 w-40 rounded-sm bg-gray-600'></span>
          <span className='h-7 w-80 rounded-full bg-gray-600'></span>
        </div>
      </div>
    </>
  );
};
