import { Hero } from '@/components/hero';

export const revalidate = 3600;

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Hero />
      <main className='px-4 py-5 sm:px-8 md:px-16'>{children}</main>
    </>
  );
}
