import { render, screen } from '@testing-library/react';
import { CreditsList } from '@/components/person';
import { mockedPersonCredits } from '@/mocks/mockedResponse';

describe('Testing BiographyInfo', () => {
  it('Should be in the document', async () => {
    render(<CreditsList credits={mockedPersonCredits} knownFor='Acting' />);

    const title = screen.getByText('Movie Title Crew');
    expect(title).toBeInTheDocument();
  });
});
