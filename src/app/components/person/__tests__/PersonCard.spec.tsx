import { render, screen } from '@testing-library/react';
import { PersonCard } from '@/components/person';

jest.mock('../PersonalInfoCard', () => ({
  PersonalInfoCard: () => <div data-testid='personal-info-card'></div>,
}));

jest.mock('../PersonMain', () => ({
  PersonMain: () => <div data-testid='person-main'></div>,
}));

describe('Testing PersonCard', () => {
  it('Should be in the document', async () => {
    render(await PersonCard({ id: '105' }));

    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAccessibleName('some text');
  });
});
