import { render, screen } from '@testing-library/react';
import { Search } from '../Search';

jest.mock('next/navigation');

describe('Testing Search', () => {
  it('Should be in the document', () => {
    render(<Search />);

    const inputSearch = screen.getByPlaceholderText('Search');
    expect(inputSearch).toBeInTheDocument();
  });
});
