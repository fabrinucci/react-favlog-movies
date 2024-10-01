import { render, screen } from '@testing-library/react';
import { PersonCard } from '@/components/person';
import { getPerson } from '@/lib';
import { mockedPerson } from '@/mocks/mockedResponse';

jest.mock('../PersonalInfoCard', () => ({
  PersonalInfoCard: () => <div data-testid='personal-info-card'></div>,
}));

jest.mock('../PersonMain', () => ({
  PersonMain: () => <div data-testid='person-main'></div>,
}));

jest.mock('../../../lib', () => ({
  getPerson: jest.fn(),
}));

describe('Testing PersonCard', () => {
  it('Should be in the document', async () => {
    (getPerson as jest.Mock).mockResolvedValue(mockedPerson);
    render(await PersonCard({ id: '105' }));

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAccessibleName('some text');
  });
});
