import { render, screen } from '@testing-library/react';
import { BiographyInfo } from '@/components/person';

describe('Testing BiographyInfo', () => {
  it('Should be in the document', async () => {
    render(<BiographyInfo name='Javier' biography='Bio example mock' />);

    const title = screen.getByText('Biography');
    expect(title).toBeInTheDocument();
  });
});
