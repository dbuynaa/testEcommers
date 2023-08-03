import { useQuery } from '@apollo/client';
import React from 'react';
import { queries } from './graphql';
import Empty from 'ui/Empty';
import Image from 'ui/Image';
import { readFile } from 'utils';

const NavProductsContainer = ({ categoryId }) => {
  const { loading, data, error } = useQuery(queries.products, {
    variables: {
      categoryId: categoryId,
      perPage: 4,
      page: 1
    }
  });
  if (loading) return <div>loading...</div>;
  if (error) return <div>error()</div>;

  const navProducts = data.poscProducts || [];
  if (!(navProducts || []).length)
    return (
      <div className="row justify-center">
        <Empty message="" size="10rem" />
      </div>
    );

  return (
    <div>
      {navProducts?.map((product: any) => {
        return (
          <>
            <div
              className="container relative text-black text-xs flex-col"
              key={product._id}
            >
              <Image
                src={readFile((product.attachment || {}).url || '')}
                alt="pic"
                sizes="50px"
                contain
                className="w-10 h-10"
              />
              <p>{product?.name}</p>
              <p className="text-red-500 text-xs items-center">
                {' '}
                {product?.unitPrice}
              </p>
            </div>
            <div
              className="container relative text-black text-xs flex-col"
              key={product._id}
            >
              <Image
                src={readFile((product.attachment || {}).url || '')}
                alt="pic"
                sizes="50px"
                contain
                className="w-10 h-10"
              />
              <p>{product?.name}</p>
              <p className="text-red-500 text-xs items-center">
                {' '}
                {product?.unitPrice}
              </p>
            </div>
          </>
        );
      })}
    </div>
  );
};

export default NavProductsContainer;
