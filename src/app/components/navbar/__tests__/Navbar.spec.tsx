import { render, screen } from '@testing-library/react';
import { Navbar } from '../Navbar';

jest.mock('../Account', () => ({
  Account: () => <div data-testid='Account'></div>,
}));

jest.mock('../Search', () => ({
  Search: () => <div data-testid='Search'></div>,
}));

describe('Testing Navbar', () => {
  test('Should be in the document', () => {
    render(<Navbar />);

    const navbar = screen.queryByRole('navigation');
    const search = screen.queryByTestId('Search');
    const account = screen.queryByTestId('Account');

    const homeLink = screen.queryByTestId('Navbar-home-link');
    const buttons = screen.queryByTestId('Navbar-btn');
    const signIn = screen.queryByTestId('Navbar-btn-sign-in');
    const signUp = screen.queryByTestId('Navbar-btn-sign-up');

    expect(navbar).toBeInTheDocument();
    expect(account).toBeInTheDocument();
    expect(search).toBeInTheDocument();

    expect(homeLink).toBeInTheDocument();
    expect(buttons).toBeInTheDocument();
    expect(signIn).toBeInTheDocument();
    expect(signUp).toBeInTheDocument();
  });

  test('Should have the correct link values', () => {
    render(<Navbar />);

    const homeLink = screen.queryByTestId('Navbar-home-link');

    expect(homeLink).toHaveAttribute('href', '/');
    expect(homeLink).toHaveTextContent('Favlog');
    expect(homeLink).toHaveAccessibleName('Go home');
  });

  test('Buttons should have the correct text', () => {
    render(<Navbar />);

    const signIn = screen.queryByTestId('Navbar-btn-sign-in');
    const signUp = screen.queryByTestId('Navbar-btn-sign-up');

    expect(signIn).toHaveTextContent('Sign In');
    expect(signUp).toHaveTextContent('Sign Up');
  });
});
