import Categories from 'modules/Products/Categories';
import Header from 'modules/Products/Header';
import { ProductsContextProvider } from 'modules/Products/context';
import ProductsContainer from 'modules/Products/Products';
import useWindowSize from 'lib/useWindowSize';

const Products = () => {
  const { width } = useWindowSize();
  return (
    <div className=" pt-3 container">
      <div className="row">
        <ProductsContextProvider>
          <div className="col-12 col-md-3 col-xl-2-5 pe-md-4 products-cat">
            {width && <Categories isMobile={width <= 768} />}
          </div>
          <div className="col-12 col-xl-9-5 col-md-9 ps-md-4">
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
