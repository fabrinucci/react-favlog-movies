export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className='absolute h-[120px] w-full  bg-gradient-to-r from-violet-900 sm:h-[80px]'></section>
      <main>{children}</main>
    </>
  );
}
