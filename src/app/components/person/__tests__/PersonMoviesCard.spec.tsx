import { render, screen } from '@testing-library/react';
import { PersonMoviesCard } from '@/components/person';
import { mockedCreditsCast } from '@/mocks/mockedResponse';

describe('Testing PersonMoviesCard', () => {
  it('Should be in the document', async () => {
    render(<PersonMoviesCard credits={mockedCreditsCast} />);

    const title = screen.getByText('Movie Title Cast');
    expect(title).toBeInTheDocument();
  });
});
