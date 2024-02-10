import { Genre, MoviesResult } from '@/interfaces';
import { SearchMovieCard } from '@/components/search';
import { parsedCategoryName } from '@/utils';

interface Props {
  id: string;
  categories: Genre[];
  movies: MoviesResult[];
}

export const CategoriesMovies = ({ id, categories, movies }: Props) => {
  const categoryName = parsedCategoryName({ id, categories });

  return (
    <div className='p-6 md:p-8'>
      <h2 className='mb-6 text-2xl font-semibold'>{categoryName}</h2>
      <ul className='grid grid-cols-2 gap-6'>
        {movies.map((movie) => (
          <SearchMovieCard key={movie.id} movie={movie} />
        ))}
      </ul>
    </div>
  );
};
