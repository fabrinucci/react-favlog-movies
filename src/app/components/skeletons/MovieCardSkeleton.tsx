export const MovieCardSkeleton = () => {
  return (
    <section className='h-full w-full'>
      {/* Navbar */}
      <div className='h-[120px] bg-gradient-to-r from-black sm:h-[80px]'></div>

      {/* MovieCard */}
      <div className='p-6 md:p-8'>
        {/* MovieInfo */}
        <section className='grid gap-8 md:grid-cols-3'>
          {/* MovieInfoImage */}
          <div className='mx-auto h-[500px] w-full overflow-clip rounded-md bg-gray-400 min-[460px]:w-[80%] sm:h-[600px] md:h-[400px] md:w-full lg:h-[500px]'></div>

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
