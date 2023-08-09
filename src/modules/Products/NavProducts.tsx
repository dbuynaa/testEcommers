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
      perPage: 3,
      page: 1
    }
  });
  if (loading) return <div>loading...</div>;
  if (error) return <div>error()</div>;

  const navProducts = data.poscProducts || [];
  console.log(navProducts, '<--');

  if (!(navProducts || []).length)
    return (
      <div className="row justify-center">
        <Empty message="" size="10rem" />
      </div>
    );

  return (
    <div className="container flex-row ">
      {navProducts &&
        navProducts?.map((product: any) => (
          <div
            className="flex-col justify-center items-center gap-5 inline-flex"
            key={product._id}
          >
            <Image
              className=" rounded-2xl"
              src={readFile((product.attachment || {}).url || '')}
              alt="pic"
              width={150}
              height={150}
            />
            <div className="flex-col justify-start items-center  flex">
              <div className=" w-48 text-center text-white text-opacity-95 text-base font-normal leading-normal tracking-tight">
                {product?.name}
              </div>
              <div className="text-yellow-400 text-xl font-bold leading-7 tracking-tight">
                {product?.unitPrice}₮
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default NavProductsContainer;
