import CategoriesContainer from 'modules/Products/Categories';
import { ProductsContextProvider } from 'modules/Products/context';
const Categories = () => {
  return (
    <ProductsContextProvider>
      <div className="categories container pb-4">
        <CategoriesContainer />
      </div>
    </ProductsContextProvider>
  );
};

export default Categories;
