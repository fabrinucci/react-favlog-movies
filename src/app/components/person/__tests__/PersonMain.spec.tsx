import { render, screen } from '@testing-library/react';
import { PersonMain } from '@/components/person';
import { getPerson, getPersonCredits } from '@/lib';
import { generateMockedPerson, generateMockedPersonCredits } from '@/mocks';

jest.mock('../../../lib', () => ({
  getPerson: jest.fn(),
  getPersonCredits: jest.fn(),
}));

jest.mock('../CreditsList', () => ({
  CreditsList: jest.fn(() => <div data-testid='CreditsList' />),
}));

jest.mock('../BiographyInfo', () => ({
  BiographyInfo: jest.fn(() => <div data-testid='BiographyInfo' />),
}));

describe('Testing PersonalInfoCard', () => {
  const mockedPerson = generateMockedPerson();
  const mockedPersonCredits = generateMockedPersonCredits(4, 3);

  test('Should be in the document', async () => {
    (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
    (getPersonCredits as jest.Mock).mockResolvedValue(mockedPersonCredits);

    render(await PersonMain({ id: '4' }));

    const name = screen.queryByTestId('PersonMain-name');
    const knownFor = screen.queryByTestId('PersonMain-known-for');

    expect(name).toBeInTheDocument();
    expect(knownFor).toBeInTheDocument();
    expect(name).toHaveTextContent(mockedPerson.name);
    expect(knownFor).toHaveTextContent('Known For');

    expect(screen.queryByTestId('CreditsList')).toBeInTheDocument();
    expect(screen.queryByTestId('BiographyInfo')).toBeInTheDocument();
  });

  test('Should render the correct number of movies when it is "acting"', async () => {
    (getPerson as jest.Mock).mockResolvedValue({
      ...mockedPerson,
      known_for_department: 'Acting',
    });
    (getPersonCredits as jest.Mock).mockResolvedValue(mockedPersonCredits);

    render(await PersonMain({ id: '4' }));

    const list = screen.queryByTestId('PersonMain-movies-list');
    expect(list?.children.length).toBe(4);
  });

  test('Should render the correct number of movies when it is not "acting"', async () => {
    (getPerson as jest.Mock).mockResolvedValue({
      ...mockedPerson,
      known_for_department: 'Directing',
    });
    (getPersonCredits as jest.Mock).mockResolvedValue(mockedPersonCredits);

    render(await PersonMain({ id: '4' }));

    const list = screen.queryByTestId('PersonMain-movies-list');
    expect(list?.children.length).toBe(3);
  });

  test('Should render a maximum of 6 movies', async () => {
    const mockedPersonCredits = generateMockedPersonCredits(20, 20);

    (getPerson as jest.Mock).mockResolvedValue({
      ...mockedPerson,
      known_for_department: 'Production',
    });

    (getPersonCredits as jest.Mock).mockResolvedValue(mockedPersonCredits);

    render(await PersonMain({ id: '4' }));

    const list = screen.queryByTestId('PersonMain-movies-list');
    expect(list?.children.length).toBe(6);
  });
});
