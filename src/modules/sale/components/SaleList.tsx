import { SaleProduct } from 'components/Products/SaleProduct';
import React from 'react';

const SaleList = ({ saleProducts, productsWithValue }: { saleProducts: any; productsWithValue: any }) => {
  console.log(productsWithValue, 'productsWithValue gg');
  return (
    <div className="sale-list">
      <div className="flex justify-between">
        <h1 className="title text-blue font-bold text-xl mt-4 mb-4">Хямдралтай бүтээгдэхүүнүүд</h1>
        {/* <div className="title text-blue font-bold text-md mt-4 mb-4">
          <select name="" id="">
            <option value="">Хувиар</option>
            <option value="">Үнээр</option>
          </select>
        </div> */}
      </div>
      <div className="products row">
        {saleProducts.map((saleProduct: any, index: number) => (
          <div className="col-6 col-md-3 col-xl-2 px-3 pb-6" key={saleProduct._id}>
            <SaleProduct {...saleProduct} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SaleList;
