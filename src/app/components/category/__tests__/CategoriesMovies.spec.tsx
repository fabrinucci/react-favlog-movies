import { render, screen } from '@testing-library/react';
import { CategoriesMovies } from '../CategoriesMovies';
import { mockedPopularMovies } from '@/mocks/mockedResponse';

describe('Testing CategoriesMovies', () => {
  it('Should be in the component', () => {
    render(
      <CategoriesMovies
        id='5'
        categories={[
          {
            id: 2,
            name: 'Horror',
          },
        ]}
        movies={mockedPopularMovies}
      />
    );

    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
  });
});
