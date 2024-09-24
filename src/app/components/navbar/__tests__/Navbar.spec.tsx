import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';

jest.mock('../Account', () => ({
  Account: () => <div data-testid='account'></div>,
}));

jest.mock('../Search', () => ({
  Search: () => <div data-testid='search'></div>,
}));

describe('Testing Search', () => {
  it('Should be in the document', () => {
    render(<Navbar />);

    const button = screen.getByText('Sign In');
    expect(button).toBeInTheDocument();
  });
});
