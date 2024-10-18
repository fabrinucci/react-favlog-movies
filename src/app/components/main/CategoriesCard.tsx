import Link from 'next/link';
import { getCategories } from '@/lib';
import { transformToSlug } from '@/utils';

export async function CategoriesCard() {
  const categories = await getCategories();

  return (
    <section data-testid='categories-card' className='py-10'>
      <h3
        data-testid='categories-card-title'
        className='mb-6 text-xl font-semibold md:text-2xl'
      >
        Select a category
      </h3>
      <ul
        data-testid='categories-card-list'
        className='flex flex-wrap items-center justify-center gap-6'
      >
        {categories?.map((category) => (
          <li key={category.id}>
            <Link
              data-testid={`category-${category.id}-link`}
              className='block rounded-md bg-violet-600 p-3 duration-200 ease-in hover:scale-110'
              href={`/category/${category.id}-${transformToSlug(
                category.name
              )}`}
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
