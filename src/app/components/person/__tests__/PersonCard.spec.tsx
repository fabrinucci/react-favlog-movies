import { render, screen } from '@testing-library/react';
import { PersonCard } from '@/components/person';
import { getPerson } from '@/lib';
import { generateMockedPerson } from '@/mocks';
import { config } from '@/config';

const { MOVIE_PATH_SMALL, FEMALE_NOT_FOUND, MALE_NOT_FOUND } = config;

jest.mock('../PersonalInfoCard', () => ({
  PersonalInfoCard: () => <div data-testid='PersonalInfoCard'></div>,
}));

jest.mock('../PersonMain', () => ({
  PersonMain: () => <div data-testid='PersonMain'></div>,
}));

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />;
  },
}));

jest.mock('../../../lib', () => ({
  getPerson: jest.fn(),
}));

describe('Testing PersonCard', () => {
  const mockedPerson = generateMockedPerson();

  test('Should be in the document', async () => {
    (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
    render(await PersonCard({ id: '105' }));

    expect(screen.getByTestId('PersonCard-img')).toBeInTheDocument();
    expect(screen.getByTestId('PersonalInfoCard')).toBeInTheDocument();
    expect(screen.getByTestId('PersonCard')).toBeInTheDocument();
    expect(screen.getByTestId('PersonMain')).toBeInTheDocument();
  });

  test('Should render the correct image', async () => {
    (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
    render(await PersonCard({ id: '105' }));
    const img = screen.getByTestId('PersonCard-img');

    expect(img).toHaveAttribute(
      'src',
      `${MOVIE_PATH_SMALL}${mockedPerson.profile_path}`
    );

    expect(img).toHaveAccessibleName(mockedPerson.name);
  });

  test('Should render the default image for women', async () => {
    (getPerson as jest.Mock).mockResolvedValue({
      ...mockedPerson,
      profile_path: null,
      gender: 1,
    });
    render(await PersonCard({ id: '105' }));
    const img = screen.getByTestId('PersonCard-img');

    expect(img).toHaveAttribute('src', FEMALE_NOT_FOUND);
    expect(img).toHaveAccessibleName(mockedPerson.name);
  });

  test('Should render the default image for men', async () => {
    (getPerson as jest.Mock).mockResolvedValue({
      ...mockedPerson,
      profile_path: null,
      gender: 2,
    });
    render(await PersonCard({ id: '105' }));
    const img = screen.getByTestId('PersonCard-img');

    expect(img).toHaveAttribute('src', MALE_NOT_FOUND);
    expect(img).toHaveAccessibleName(mockedPerson.name);
  });

  test('Should render the default image for non-binary', async () => {
    (getPerson as jest.Mock).mockResolvedValue({
      ...mockedPerson,
      profile_path: null,
      gender: 3,
    });
    render(await PersonCard({ id: '105' }));
    const img = screen.getByTestId('PersonCard-img');

    expect(img).toHaveAttribute('src', MALE_NOT_FOUND);
    expect(img).toHaveAccessibleName(mockedPerson.name);
  });
});
