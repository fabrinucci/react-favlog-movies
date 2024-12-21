import { fireEvent, render, screen } from '@testing-library/react';
import { Search } from '../Search';
import { useRouter, useSearchParams } from 'next/navigation';

jest.mock('next/navigation');

jest.mock('use-debounce', () => ({
  useDebouncedCallback: (fn: (...args: any[]) => void) => fn,
}));

describe('Testing Search', () => {
  const mockUseSearchParams = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue({
      get: mockUseSearchParams,
    });
  });

  test('Should be in the document', () => {
    render(<Search />);

    const search = screen.queryByTestId('Search');
    const inputSearch = screen.getByRole('textbox');

    expect(search).toBeInTheDocument();
    expect(inputSearch).toBeInTheDocument();
  });

  test('Should render the input correctly with the default value', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (param: string) => (param === 'query' ? 'test' : null),
    });

    render(<Search />);

    const inputSearch = screen.getByRole('textbox');

    expect(inputSearch).toHaveAttribute('placeholder', 'Search');
    expect(inputSearch).toHaveAttribute('type', 'text');
    expect(inputSearch).toHaveValue('test');
  });

  test('Should navigate to the correct route when entering a search value', () => {
    render(<Search />);

    const inputSearch = screen.getByRole('textbox');
    fireEvent.change(inputSearch, { target: { value: 'Marvel' } });

    expect(mockPush).toHaveBeenCalledWith('/search?query=Marvel&page=1');
  });

  test('Should navigate to the main page if the search value is empty', () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (param: string) => (param === 'query' ? 'test' : null),
    });

    render(<Search />);

    const inputSearch = screen.getByRole('textbox');
    fireEvent.change(inputSearch, { target: { value: '' } });

    expect(mockPush).toHaveBeenCalledWith('/');
  });
});
