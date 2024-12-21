import { fireEvent, render, screen } from '@testing-library/react';
import { BiographyInfo } from '@/components/person';

describe('Testing BiographyInfo', () => {
  test('Should correctly render the elements', () => {
    const name = 'John Doe';
    const mockedBio = 'This is a short biography.';

    render(<BiographyInfo name={name} biography={mockedBio} />);

    const title = screen.getByTestId('Biography-title');
    const biography = screen.getByTestId('Biography-bio');

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Biography');

    expect(biography).toBeInTheDocument();
    expect(biography.children.length).toBe(1);

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  test('Should handle correctly the button', () => {
    const name = 'John Doe';
    const mockedBio =
      'This is a short biography. \n\nAnother paragraph here. \n\nNew paragraph to test';

    render(<BiographyInfo name={name} biography={mockedBio} />);

    const title = screen.getByTestId('Biography-title');
    const biography = screen.getByTestId('Biography-bio');
    const button = screen.queryByRole('button');

    expect(title).toBeInTheDocument();
    expect(biography.children.length).toBe(3);

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Read more/i);
    expect(button).not.toHaveTextContent(/Hide text/i);

    fireEvent.click(button!);
    expect(button).toHaveTextContent(/Hide text/i);
    expect(button).not.toHaveTextContent(/Read more/i);

    fireEvent.click(button!);
    expect(button).toHaveTextContent(/Read more/i);
    expect(button).not.toHaveTextContent(/Hide text/i);
  });

  test('Should display a message when there is no biography', () => {
    const name = 'Jane Doe';

    render(<BiographyInfo name={name} biography={''} />);

    const noBioMessage = screen.getByTestId('Biography-bio');

    expect(noBioMessage).toBeInTheDocument();
    expect(noBioMessage).toHaveTextContent(
      `We don't have biography for ${name}.`
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
