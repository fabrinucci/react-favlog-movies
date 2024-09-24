import { render, screen } from '@testing-library/react';
import { PersonalInfoCard } from '@/components/person';

describe('Testing PersonalInfoCard', () => {
  it('Should be in the document', async () => {
    render(await PersonalInfoCard({ id: '105' }));

    const title = screen.getByText('Personal Info');
    expect(title).toBeInTheDocument();
  });
});
