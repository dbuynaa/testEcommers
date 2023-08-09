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
    <div className="container">
      {products?.map((product: any) => {
        return (
          <>
            <div className="w-80 h-96 relative">
              <div className="w-80 h-96 left-0 top-0 absolute bg-gray-100" />
              <div className="w-72 h-96 left-[23px] top-[18.28px] absolute">
                <div className="w-72 h-80 left-0 top-0 absolute bg-gray-100 rounded-3xl">
                  <Image
                    className="w-48 h-56 left-[45px] top-[27.07px] absolute"
                    src={readFile((product.attachment || {}).url || '')}
                    alt="picture"
                  />
                  <div className="w-14 h-7 pl-3 pr-3.5 pt-1 pb-1.5 left-[220px] top-[12.07px] absolute bg-red-500 rounded-xl justify-center items-center inline-flex">
                    <div className="text-white text-sm font-bold leading-none tracking-tight">
                      Sale
                    </div>
                  </div>
                </div>
                <div className="left-[17px] top-[266.07px] absolute flex-col justify-start items-center gap-3 inline-flex">
                  <div className="w-64 text-center text-gray-700 text-xl font-normal leading-7 tracking-tight ">
                    {product.name}
                  </div>
                  <div className="w-52 rounded-3xl justify-start items-start gap-12 inline-flex">
                    <div className="w-20 text-center text-gray-500 text-xl font-normal line-through leading-7 tracking-tight">
                      95,000₮
                    </div>
                    <div className="grow shrink basis-0 text-right text-gray-700 text-xl font-bold leading-7 tracking-tight">
                      95,000₮
                    </div>
                  </div>
                </div>
              </div>
            </div>{' '}
          </>
        );
      })}
    </div>
  );
};

export default SaleProduct;



