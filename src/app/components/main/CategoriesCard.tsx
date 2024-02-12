import Link from 'next/link';
import { getCategories } from '@/lib';
import { transformToKebabCase } from '@/utils';

export async function CategoriesCard() {
  const categories = await getCategories();

  return (
    <section className='py-10'>
      <h3 className='mb-6 text-xl font-semibold md:text-2xl'>
        Select a category
      </h3>
      <ul className='flex flex-wrap items-center justify-center gap-6'>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              className='block rounded-md bg-violet-600 p-3 duration-200 ease-in hover:scale-110'
              href={`/category/${category.id}-${transformToKebabCase(
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
