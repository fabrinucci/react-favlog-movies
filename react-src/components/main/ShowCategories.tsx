import { useCategories } from '../../hooks';

export const ShowCategories = () => {
  const { categories } = useCategories();
  console.log(categories);

  return <div>ShowCategories</div>;
};
