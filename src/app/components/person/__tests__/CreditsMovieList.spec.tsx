import { render, screen } from '@testing-library/react';
import { CreditsMovieList } from '@/components/person';
import { generateMockedCredits } from '@/mocks/mockers';
import type { CreditCast, CreditCrewFiltered } from '@/interfaces';
import { formatStrings } from '@/utils';

describe('Testing CreditsMovieList', () => {
  test('Should render lists', () => {
    const mockedCreditsListCast = generateMockedCredits(6, 'cast');

    render(
      <CreditsMovieList creditsList={mockedCreditsListCast} type={'Acting'} />
    );

    const title = screen.getByTestId('CreditsMovieList-title');
    const card = screen.getByTestId('CreditsMovieList-card');
    const ul = screen.getByTestId('CreditsMovieList-ul');

    expect(card).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(/Acting/i);
    expect(ul).toBeInTheDocument();
  });

  test('Should render correctly the credits by acting', () => {
    const mockedCreditsListCast = generateMockedCredits(
      12,
      'cast'
    ) as CreditCast[];

    render(
      <CreditsMovieList creditsList={mockedCreditsListCast} type='Acting' />
    );

    const li = screen.getAllByTestId('CreditsMovieList-li');
    const characters = screen.queryAllByTestId('CreditsMovieList-character');
    const jobs = screen.queryAllByTestId('CreditsMovieList-job');

    expect(li.length).toBe(12);

    expect(li[2]).toHaveTextContent(mockedCreditsListCast[2].title);
    expect(li[5]).toHaveTextContent(mockedCreditsListCast[5].title);

    expect(characters.length).toBe(12);
    expect(jobs.length).toBe(0);

    expect(characters[4]).toHaveTextContent(
      `as ${mockedCreditsListCast[4].character}`
    );
  });

  test('Should render correctly the credits by crew', () => {
    const mockedCreditsListCrew = generateMockedCredits(
      8,
      'crew'
    ) as CreditCrewFiltered[];

    render(
      <CreditsMovieList creditsList={mockedCreditsListCrew} type='Crew' />
    );

    const li = screen.getAllByTestId('CreditsMovieList-li');
    const characters = screen.queryAllByTestId('CreditsMovieList-character');
    const jobs = screen.queryAllByTestId('CreditsMovieList-job');

    expect(li.length).toBe(8);

    expect(li[1]).toHaveTextContent(mockedCreditsListCrew[1].title);
    expect(li[3]).toHaveTextContent(mockedCreditsListCrew[3].title);

    expect(characters.length).toBe(0);
    expect(jobs.length).toBe(8);

    expect(jobs[4]).toHaveTextContent(
      formatStrings(mockedCreditsListCrew[4].job)
    );
  });

  test('Should show the year of the release date or an icon when there is no date', () => {
    const mockedCreditsListCast = generateMockedCredits(2, 'cast');
    mockedCreditsListCast[1].release_date = '';

    render(
      <CreditsMovieList creditsList={mockedCreditsListCast} type='Acting' />
    );

    const releaseDates = screen.getAllByTestId('CreditsMovieList-release');
    expect(releaseDates[0]).toHaveTextContent(
      mockedCreditsListCast[0].release_date.slice(0, 4)
    );

    expect(releaseDates[1]).toContainElement(
      screen.getByTestId('CreditsMovieList-no-release')
    );
  });
});
