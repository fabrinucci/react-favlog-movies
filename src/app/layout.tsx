import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import './globals.css';

const inter = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://favlog-movies.vercel.app/'),
  title: {
    template: '%s | Favlog Movies',
    default: 'Favlog Movies',
  },
  description: 'Find the movie you want to watch',
  keywords: [
    'Movies',
    'Actors',
    'Actresses',
    'Photos',
    'User Ratings',
    'Credits',
    'Cast',
  ],
  authors: { name: 'Fabrizio Nucci', url: 'https://fabrinucci.github.io/' },
  openGraph: {
    title: 'Favlog Movies',
    description: 'Find the movie you want to watch',
    url: 'https://favlog-movies.vercel.app/',
    siteName: 'Favlog Movies',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} min-h-[100vh] bg-[#1d0a36] text-purple-100`}
      >
        <header>
          <Navbar />
        </header>
        {children}
      </body>
    </html>
  );
}
