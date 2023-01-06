import CategoriesContainer from 'modules/Products/Categories';
import ProductsContext from 'modules/Products/context';
const Categories = () => {
  return (
    <ProductsContext>
      <div className="categories py-3">
        <CategoriesContainer />
      </div>
    </ProductsContext>
  );
};

export default Categories;
