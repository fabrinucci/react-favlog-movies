import { render, screen } from '@testing-library/react';
import { CategoriesCard } from '../CategoriesCard';

describe('Testing <CategoriesCard />', () => {
  it('Should be in the component', async () => {
    render(await CategoriesCard());

    const category = screen.getByText('Select a category');
    expect(category).toBeInTheDocument();
  });
});
