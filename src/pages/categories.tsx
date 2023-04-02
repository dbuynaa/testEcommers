import CategoriesContainer from 'modules/Products/Categories';
import { ProductsContextProvider } from 'modules/Products/context';
const Categories = () => {
  return (
    <ProductsContextProvider>
      <div className="categories py-3">
        <CategoriesContainer />
      </div>
    </ProductsContextProvider>
  );
};

export default Categories;
