import { useCategories } from '../hooks/useCategories';

export const ShowCategories = () => {
  const { categories } = useCategories();
  console.log(categories);

  return <div>ShowCategories</div>;
};
