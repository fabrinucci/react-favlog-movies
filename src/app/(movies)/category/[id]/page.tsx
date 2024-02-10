import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { CategoriesMovies } from '@/components/category';
import { Pagination } from '@/components/search';
import { getCategories, getMoviesByCategory } from '@/lib';
import { parsedCategoryName, validatedPage } from '@/utils';

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    page: string;
  };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const [id] = params.id.split('-');
  const categories = await getCategories();
  const categoryName = parsedCategoryName({ id, categories });

  return {
    title: categoryName,
    description: `Find ${categoryName} movies.`,
  };
}

export default async function Page({ params, searchParams }: Props) {
  const [id, category] = params.id.split('-');
  const { page } = searchParams;

  const movies = await getMoviesByCategory({
    categoryId: id,
    page: validatedPage(Number(page)),
  });

  if (movies.results.length === 0) redirect('/');

  const categories = await getCategories();

  if (
    Number(page) > 500 ||
    Number(page) > movies.total_pages ||
    isNaN(Number(page))
  )
    redirect(`/category/${id}${category ? `-${category}` : ''}?page=1`);

  return (
    <section className='pt-[120px] sm:pt-[80px]'>
      <div className='mb-10'>
        <CategoriesMovies
          id={id}
          categories={categories}
          movies={movies.results}
        />
        <Pagination movies={movies} />
      </div>
    </section>
  );
}
