import { render, screen } from '@testing-library/react';
import { CategoriesCard } from '../CategoriesCard';
import { getCategories } from '@/lib';
import { mockedCategories } from '@/mocks/mockedResponse';

jest.mock('../../../lib', () => ({
  getCategories: jest.fn(),
}));

describe('Testing <CategoriesCard />', () => {
  it('Should be in the component', async () => {
    (getCategories as jest.Mock).mockResolvedValue(mockedCategories);
    render(await CategoriesCard());

    const selectCategory = screen.getByText('Select a category');
    const animationCat = screen.getByText('Animation');

    expect(selectCategory).toBeInTheDocument();
    expect(animationCat).toBeInTheDocument();
  });
});
