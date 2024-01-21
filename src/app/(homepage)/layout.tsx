import { Hero } from '@/components/hero';

export default function HomePageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Hero />
      {children}
    </>
  );
}
