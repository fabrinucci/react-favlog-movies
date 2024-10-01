import { render, screen } from '@testing-library/react';
import {
  mockedFullMovie,
  mockedMovieCrewFiltered,
} from '@/mocks/mockedResponse';
import { MovieInfo } from '../MovieInfo';

describe('Testing <MovieInfo />', () => {
  it('Should be in the component', async () => {
    render(
      <MovieInfo movie={mockedFullMovie} movieCrew={mockedMovieCrewFiltered} />
    );

    const title = screen.getByText('Full movie title');
    expect(title).toBeInTheDocument();
  });
});
