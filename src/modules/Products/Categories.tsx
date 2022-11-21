import { use } from 'react';
import getCategories from 'lib/getCategories';
import Categories from 'components/Products/Categories';

const CategoriesContainer = () => {
  const { categories, rootCatergories } = use(getCategories());
  return (
    <Categories categories={categories} rootCatergories={rootCatergories} />
  );
};

export default CategoriesContainer;
