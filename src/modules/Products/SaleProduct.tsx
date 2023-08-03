import { useQuery } from '@apollo/client';
import React from 'react';
import Loading from 'ui/Loading';
import { queries } from './graphql';
import Image from 'ui/Image';
import { readFile } from 'utils';
import Empty from 'ui/Empty';
const SaleProduct = ({ productId }) => {
  const { data: pricingData, loading: pricingLoading } = useQuery(
    queries.productPricingPlans,
    {
      variables: {
        status: 'active',
        productId: productId,
        findOne: false
      }
    }
  );
  const pricingProducts = pricingData?.pricingPlans || []; // 2 id

  console.log('pricingProduct', pricingProducts);

  const { data, loading } = useQuery(queries.products, {
    variables: {
      ids: pricingProducts.productId || null,
      perPage: 1
    }
  });

  const products = data?.poscProducts || [];
  if (loading) return <Loading />;

  if (!(products || []).length)
    return (
      <div className="row justify-center">
        <Empty message="" size="10rem" />
      </div>
    );
  console.log('products.........', products);
 
  

  return (
    <div>
      {products?.map((product: any) => {
        return (
          <>
            <div
              className="container text-black text-xs flex-col"
              key={product._id}
            >
              <h5 className="text-blue mb-2 font-bold">
                Хямдралтай Бүтээгдэхүүн
              </h5>
              <div className="relative w-10 h-10">
                <Image
                  src={readFile((product.attachment || {}).url || '')}
                  alt="pic"
                />
              </div>
              <p className="">{product.name}</p>
              <p></p>
              <p className="text-red-500">{product.unitPrice}</p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default SaleProduct;
