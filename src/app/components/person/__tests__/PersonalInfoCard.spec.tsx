import { render, screen } from '@testing-library/react';
import { PersonalInfoCard } from '@/components/person';
import { getPerson } from '@/lib';
import { generateMockedPerson } from '@/mocks/mockers';
import { calculateAge } from '@/utils';

jest.mock('../../../lib', () => ({
  getPerson: jest.fn(),
}));

jest.mock('../../../utils', () => ({
  calculateAge: jest.fn(),
}));

describe('Testing PersonalInfoCard', () => {
  const mockedPerson = generateMockedPerson();

  beforeEach(() => {
    (calculateAge as jest.Mock).mockImplementation(({ deathDate }) =>
      deathDate ? 40 : 50
    );
  });

  describe('Globals tests', () => {
    test('Should render the correct data', async () => {
      (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
      render(await PersonalInfoCard({ id: '105' }));

      const component = screen.queryByTestId('PersonalInfoCard');
      const name = screen.queryByTestId('PersonalInfoCard-name');
      const list = screen.queryByTestId('PersonalInfoCard-ul')!;

      expect(component).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(screen.queryByText('Personal Info')).toBeInTheDocument();
      expect(list).toBeInTheDocument();
      expect(list.children.length).toBe(5);

      expect(name).toHaveTextContent(mockedPerson.name);
    });

    test('Personal info list item should be in the document', async () => {
      (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
      render(await PersonalInfoCard({ id: '105' }));

      const birthDayLi = screen.queryByTestId('PersonalInfoCard-li-birthday');
      const deathDayLi = screen.queryByTestId('PersonalInfoCard-li-deathday');
      const genderLi = screen.queryByTestId('PersonalInfoCard-li-gender');
      const knownForLi = screen.queryByTestId('PersonalInfoCard-li-known-for');
      const placeBirthLi = screen.queryByTestId(
        'PersonalInfoCard-li-place-birth'
      );

      expect(birthDayLi).toBeInTheDocument();
      expect(deathDayLi).toBeInTheDocument();
      expect(genderLi).toBeInTheDocument();
      expect(knownForLi).toBeInTheDocument();
      expect(placeBirthLi).toBeInTheDocument();
    });

    test('Personal info title should be in the document', async () => {
      (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
      render(await PersonalInfoCard({ id: '105' }));

      const birthDayTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-birthday'
      );

      const deathDayTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-deathday'
      );

      const genderTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-gender'
      );
      const knownForTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-known-for'
      );

      const placeBirthTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-place-birth'
      );

      expect(birthDayTitle).toBeInTheDocument();
      expect(deathDayTitle).toBeInTheDocument();
      expect(genderTitle).toBeInTheDocument();
      expect(knownForTitle).toBeInTheDocument();
      expect(placeBirthTitle).toBeInTheDocument();
    });

    test('Personal info subtitle should be in the document', async () => {
      (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
      render(await PersonalInfoCard({ id: '105' }));

      const birthDaySubtitle = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-birthday'
      );

      const deathDaySubtitle = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-deathday'
      );

      const genderSubtitle = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-gender'
      );

      const knownForSubtitle = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-known-for'
      );

      const placeBirthSubtitle = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-place-birth'
      );

      expect(birthDaySubtitle).toBeInTheDocument();
      expect(deathDaySubtitle).toBeInTheDocument();
      expect(genderSubtitle).toBeInTheDocument();
      expect(knownForSubtitle).toBeInTheDocument();
      expect(placeBirthSubtitle).toBeInTheDocument();
    });

    test('Personal info should be correct', async () => {
      (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
      render(await PersonalInfoCard({ id: '105' }));

      const birthDayTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-birthday'
      );

      const deathDayTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-deathday'
      );

      const genderTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-gender'
      );

      const knownForTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-known-for'
      );

      const placeBirthTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-place-birth'
      );

      expect(birthDayTitle).toHaveTextContent('Birthday');
      expect(deathDayTitle).toHaveTextContent('Day of Death');
      expect(genderTitle).toHaveTextContent('Gender');
      expect(knownForTitle).toHaveTextContent('Known for');
      expect(placeBirthTitle).toHaveTextContent('Place of Birth');
    });
  });

  describe('Date test', () => {
    test('Should render correctly when have deathday', async () => {
      (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
      render(await PersonalInfoCard({ id: '105' }));

      const birthDayTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-birthday'
      );

      const birthDaySubtitle = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-birthday'
      );

      const deathDayTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-deathday'
      );

      const deathDaySubtitle = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-deathday'
      );

      expect(birthDayTitle).toHaveTextContent('Birthday');
      expect(birthDaySubtitle).toHaveTextContent(mockedPerson.birthday!);
      expect(deathDayTitle).toHaveTextContent('Day of Death');
      expect(deathDaySubtitle).toHaveTextContent('(40 years old)');
    });

    test('Should render correctly when no birthday', async () => {
      (getPerson as jest.Mock).mockResolvedValue({
        ...mockedPerson,
        birthday: null,
      });
      render(await PersonalInfoCard({ id: '105' }));
      const birthDayLi = screen.queryByTestId('PersonalInfoCard-li-deathday');
      const deathDayLi = screen.queryByTestId('PersonalInfoCard-li-deathday');

      expect(birthDayLi).not.toBeInTheDocument();
      expect(deathDayLi).not.toBeInTheDocument();
    });

    test('Should render correctly when no deathDay', async () => {
      (getPerson as jest.Mock).mockResolvedValue({
        ...mockedPerson,
        deathday: null,
      });
      render(await PersonalInfoCard({ id: '105' }));
      const birthDayTitle = screen.queryByTestId(
        'PersonalInfoCard-li-title-birthday'
      );

      const birthDaySubtitle = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-birthday'
      );

      const deathDayLi = screen.queryByTestId('PersonalInfoCard-li-deathday');

      expect(birthDayTitle).toHaveTextContent('Birthday');
      expect(birthDaySubtitle).toHaveTextContent(
        `${mockedPerson.birthday} (50 years old)`
      );

      expect(deathDayLi).not.toBeInTheDocument();
    });
  });

  describe('Gender tests', () => {
    test('Should render "-" when no gender', async () => {
      (getPerson as jest.Mock).mockResolvedValue({
        ...mockedPerson,
        gender: 0,
      });

      render(await PersonalInfoCard({ id: '105' }));
      const gender = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-gender'
      );

      expect(gender).toHaveTextContent('-');
    });

    test('Should render "female" gender', async () => {
      (getPerson as jest.Mock).mockResolvedValue({
        ...mockedPerson,
        gender: 1,
      });

      render(await PersonalInfoCard({ id: '105' }));
      const gender = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-gender'
      );

      expect(gender).toHaveTextContent('Female');
    });

    test('Should render "male" gender', async () => {
      (getPerson as jest.Mock).mockResolvedValue({
        ...mockedPerson,
        gender: 2,
      });

      render(await PersonalInfoCard({ id: '105' }));
      const gender = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-gender'
      );

      expect(gender).toHaveTextContent('Male');
    });

    test('Should render "non-binary" gender', async () => {
      (getPerson as jest.Mock).mockResolvedValue({
        ...mockedPerson,
        gender: 3,
      });

      render(await PersonalInfoCard({ id: '105' }));
      const gender = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-gender'
      );

      expect(gender).toHaveTextContent('Non-binary');
    });
  });

  describe('Place of birth tests', () => {
    test('Should render correct place of birth', async () => {
      (getPerson as jest.Mock).mockResolvedValue(mockedPerson);

      render(await PersonalInfoCard({ id: '105' }));
      const place = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-place-birth'
      );

      expect(place).toHaveTextContent(mockedPerson.place_of_birth!);
    });

    test('Should not be in the document', async () => {
      (getPerson as jest.Mock).mockResolvedValue({
        ...mockedPerson,
        place_of_birth: null,
      });

      render(await PersonalInfoCard({ id: '105' }));
      const place = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-place-birth'
      );

      expect(place).not.toBeInTheDocument();
    });
  });
  describe('Known for department tests', () => {
    test('Should render correct department', async () => {
      (getPerson as jest.Mock).mockResolvedValue(mockedPerson);

      render(await PersonalInfoCard({ id: '105' }));
      const knownFor = screen.queryByTestId(
        'PersonalInfoCard-li-subtitle-known-for'
      );

      expect(knownFor).toHaveTextContent(mockedPerson.known_for_department);
    });
  });
});
