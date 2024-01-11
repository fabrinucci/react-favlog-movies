export const MovieCardSkeleton = () => {
  return (
    <section className='h-full w-full'>
      {/* Navbar */}
      <div className='h-[120px] bg-gradient-to-r from-black sm:h-[80px]'></div>

      {/* MovieCard */}
      <div className='px-4 md:px-8'>
        {/* MovieInfo */}
        <section className='grid gap-8 py-10 md:grid-cols-3 md:py-6'>
          {/* MovieInfoImage */}
          <div className='mx-auto h-[400px] w-[70%] rounded-md bg-gray-500 sm:h-[500px] sm:w-[60%] md:col-span-1 md:h-[350px] md:w-full lg:h-[600px]'></div>

          {/* MovieInfoDetails */}
          <div className='h-screen w-full md:col-span-2 md:h-auto md:w-auto'>
            <div className='flex animate-loading flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:justify-start'>
              <span className='mx-auto h-10 w-[70%] rounded-[40px] bg-gray-500 sm:mx-0 sm:w-[50%]'></span>
              <div className='mt-5 flex w-full items-center justify-center gap-4 sm:mt-0 sm:w-auto'>
                <span className='h-[30px] w-[50px] rounded-[50px] bg-gray-500'></span>
                <span className='h-[30px] w-[50px] rounded-[50px] bg-gray-500'></span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
