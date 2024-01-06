export const MovieInfoSkeleton = () => {
  return (
    <section className='grid gap-8 py-10 md:grid-cols-3 md:py-6'>
      <div className='mx-auto h-screen w-[80%] animate-loading rounded-md bg-gray-600 sm:w-[60%] md:col-span-1 md:h-[350px] md:w-full lg:h-[500px]'></div>
      <div className='h-screen w-full md:col-span-2 md:h-auto md:w-auto'>
        <div className='flex animate-loading flex-col sm:flex-row sm:items-center sm:justify-center sm:gap-6 md:justify-start'>
          <span className='mx-auto h-10 w-[70%] rounded-[40px] bg-gray-600 sm:mx-0 sm:w-[50%]'></span>
          <div className='mt-5 flex w-full items-center justify-center gap-4 sm:mt-0 sm:w-auto'>
            <span className='h-[30px] w-[50px] rounded-[50px] bg-gray-600'></span>
            <span className='h-[30px] w-[50px] rounded-[50px] bg-gray-600'></span>
          </div>
        </div>
      </div>
    </section>
  );
};
