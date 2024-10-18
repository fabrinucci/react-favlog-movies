import { render, screen } from '@testing-library/react';
import { CategoriesCard } from '../CategoriesCard';
import { getCategories } from '@/lib';
import { generateCategories } from '@/mocks/mockers';

jest.mock('../../../lib', () => ({
  getCategories: jest.fn(),
}));

describe('Testing <CategoriesCard />', () => {
  const mockedCategories = generateCategories(4);

  test('Should be in the component', async () => {
    (getCategories as jest.Mock).mockResolvedValue(mockedCategories);
    render(await CategoriesCard());

    const card = screen.getByTestId('categories-card');
    const title = screen.getByTestId('categories-card-title');
    const list = screen.getByTestId('categories-card-list');

    expect(card).toBeInTheDocument();

    expect(list).toBeInTheDocument();
    expect(list.children.length).toBe(4);

    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('Select a category');
  });

  test('Should render the correct link information', async () => {
    (getCategories as jest.Mock).mockResolvedValue(mockedCategories);
    render(await CategoriesCard());

    const link1 = screen.getByTestId(`category-${mockedCategories[0].id}-link`);
    const link2 = screen.getByTestId(`category-${mockedCategories[2].id}-link`);

    expect(link1).toHaveTextContent(mockedCategories[0].name);
    expect(link2).toHaveTextContent(mockedCategories[2].name);

    expect(link1).toHaveAttribute(
      'href',
      `/category/${
        mockedCategories[0].id
      }-${mockedCategories[0].name.toLowerCase()}`
    );

    expect(link2).toHaveAttribute(
      'href',
      `/category/${
        mockedCategories[2].id
      }-${mockedCategories[2].name.toLowerCase()}`
    );
  });
});
