import Categories from 'modules/Products/Categories';
import Header from 'modules/Products/Header';
import ProductsContext from 'modules/Products/context';

const Products = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container pt-3">
      <div className="row">
        <ProductsContext>
          <div className="col-3 pe-4">
            <Categories />
          </div>
          <div className="col-9">
            <Header />
            {children}
          </div>
        </ProductsContext>
      </div>
    </div>
  );
};

export default Products;
