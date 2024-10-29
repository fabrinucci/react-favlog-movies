import { render, screen } from '@testing-library/react';
import { CreditsList } from '@/components/person';
import { generateMockedPersonCredits } from '@/mocks/mockers';

describe('Testing BiographyInfo', () => {
  test('Should render lists', async () => {
    const mockedPersonCredits = generateMockedPersonCredits(5, 10);
    render(<CreditsList credits={mockedPersonCredits} knownFor='Acting' />);

    const component = screen.getByTestId('CreditsList');
    const title = screen.getAllByTestId('CreditsMovieList-title');

    expect(component).toBeInTheDocument();
    expect(component.children.length).toBe(2);
    expect(title[0]).toHaveTextContent(/Acting/i);
    expect(title[1]).toHaveTextContent(/Crew/i);
  });

  test('Should not render lists when there is no credits', async () => {
    const mockedPersonCredits = generateMockedPersonCredits(0, 0);

    render(<CreditsList credits={mockedPersonCredits} knownFor='Acting' />);

    const component = screen.getByTestId('CreditsList');
    expect(component.children.length).toBe(0);
  });

  test('Should no render the Crew list when crew is empty', () => {
    const mockedPersonCredits = generateMockedPersonCredits(4, 0);

    render(<CreditsList credits={mockedPersonCredits} knownFor='Acting' />);

    expect(screen.queryByText('Acting')).toBeInTheDocument();
    expect(screen.queryByText('Crew')).not.toBeInTheDocument();
  });

  test('Should no render the Cast list when cast is empty', () => {
    const mockedPersonCredits = generateMockedPersonCredits(0, 4);

    render(<CreditsList credits={mockedPersonCredits} knownFor='Acting' />);

    expect(screen.queryByText('Acting')).not.toBeInTheDocument();
    expect(screen.queryByText('Crew')).toBeInTheDocument();
  });
});
