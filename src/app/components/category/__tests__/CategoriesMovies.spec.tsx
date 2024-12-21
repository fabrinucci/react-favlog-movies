import { render, screen } from '@testing-library/react';
import { CategoriesMovies } from '../CategoriesMovies';
import { generateCategories, generateMockedMovies } from '@/mocks';

describe('Testing CategoriesMovies', () => {
  const mockedPopularMovies = generateMockedMovies(10);
  test('Title should be the correct values', () => {
    const mockedCategories = generateCategories(5);
    render(
      <CategoriesMovies
        id={`${mockedCategories[1].id}`}
        categories={mockedCategories}
        movies={mockedPopularMovies}
      />
    );

    const title = screen.getByTestId('CategoriesMovies-title');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(mockedCategories[1].name);
  });

  test('Category list should be in the document', () => {
    const mockedCategories = generateCategories(3);
    render(
      <CategoriesMovies
        id='564'
        categories={mockedCategories}
        movies={mockedPopularMovies}
      />
    );

    const categoryList = screen.getByTestId('CategoriesMovies-list');
    expect(categoryList).toBeInTheDocument();
  });
});
