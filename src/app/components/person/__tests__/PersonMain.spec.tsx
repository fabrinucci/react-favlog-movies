import { render, screen } from '@testing-library/react';
import { PersonMain } from '@/components/person';

describe('Testing PersonalInfoCard', () => {
  it('Should be in the document', async () => {
    render(await PersonMain({ id: '4' }));

    const title = screen.getByText('Biography');
    expect(title).toBeInTheDocument();
  });
});
