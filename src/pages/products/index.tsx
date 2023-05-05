import Categories from 'modules/Products/Categories';
import Header from 'modules/Products/Header';
import { ProductsContextProvider } from 'modules/Products/context';
import ProductsContainer from 'modules/Products/Products';

const Products = () => {
  return (
    <div className="px-3 pt-4 container">
      <div className="row">
        <ProductsContextProvider>
          <div className="col-12 col-md-3 pe-md-4">
            <Categories />
          </div>
          <div className="col-12 col-md-9">
            <Header />
            <div className="row products">
              <ProductsContainer />
            </div>
          </div>
        </ProductsContextProvider>
      </div>
    </div>
  );
};

export default Products;
