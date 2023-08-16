import { useQuery } from '@apollo/client';
import React from 'react';
import Loading from 'ui/Loading';
import { queries } from './graphql';
import Empty from 'ui/Empty';
import { SaleProduct as SaleProductComponent } from '../../components/Products/SaleProduct';
const SaleProduct = ({ productId }: any) => {
  const { data: pricingData, loading: pricingLoading } = useQuery(queries.productPricingPlans, {
    variables: {
      status: 'active',
      productId: productId,
      findOne: false,
    },
  });
  const pricingProducts = pricingData?.pricingPlans || []; // 2 id


  const { data, loading } = useQuery(queries.products, {
    variables: {
      ids: pricingProducts.productId || null,
      perPage: 4,
    },
  });

  const products = data?.poscProducts || [];
  if (loading) return <Loading />;

  if (!(products || []).length)
    return (
      <div className="row justify-center">
        <Empty message="" size="10rem" />
      </div>
    );

  return (
    <div className="container">
      <div className="row">
        {products?.map((product: any) => {
          return <SaleProductComponent key={product._id} {...product} wrapped />;
        })}
      </div>
    </div>
  );
};

export default SaleProduct;
