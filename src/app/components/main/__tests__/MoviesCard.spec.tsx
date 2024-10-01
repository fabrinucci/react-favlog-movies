import { render, screen } from '@testing-library/react';
import { MoviesCard } from '@/components/main/MoviesCard';

describe('Testing <MoviesCard />', () => {
  it('Should be in the component', async () => {
    render(
      await MoviesCard({
        moviesTitle: 'Popular movies',
        movieType: 'popular',
      })
    );

    const title = screen.getByText('Popular movies');
    expect(title).toBeInTheDocument();
  });
});
