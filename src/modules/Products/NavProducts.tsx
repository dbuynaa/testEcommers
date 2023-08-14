import { useQuery } from '@apollo/client';
import React from 'react';
import { queries } from './graphql';
import Empty from 'ui/Empty';
import Image from 'ui/Image';
import { readFile } from 'utils';
import Link from 'next/link';
import Spinner from 'components/Products/Spinner';

const NavProductsContainer = ({ categoryId }) => {
  const { loading, data, error } = useQuery(queries.products, {
    variables: {
      categoryId: categoryId,
      perPage: 3,
      page: 1,
    },
  });

  const {
    loading: featuredLoading,
    data: featuredData,
    error: featuredError,
  } = useQuery(queries.products, {
    variables: {
      tag: 'DqqxcTxkf6FQzgiTE',
      categoryId: categoryId,
      perPage: 3,
      page: 1,
    },
  });
  if (loading || featuredLoading) return <Spinner />;
  if (error || featuredError) return <div></div>;

  const navProducts = data.poscProducts || [];
  const featuredProducts = featuredData.poscProducts || [];

  if (!(navProducts || []).length)
    return (
      <div className="row justify-center">
        <Empty message="" size="10rem" />
      </div>
    );

  return (
    <div className="container flex-row nav-products">
      <div className="flex">
        <div className="featured-nav-products">
          <h5>Онцлох</h5>
          <div className="flex">
            {featuredProducts &&
              featuredProducts?.map((product: any) => (
                <div className="flex-col justify-center items-center gap-5 inline-flex nav-product" key={product._id}>
                  <Link href={'/products/' + product._id}>
                    <div className="img-wrapper">
                      <Image
                        className="nav-product-img rounded-2xl"
                        src={readFile((product.attachment || {}).url || '')}
                        alt="pic"
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="flex-col justify-start items-center  flex">
                      <h6>{product?.name}</h6>
                      <div className="text-yellow-400 text-lg font-bold leading-7 tracking-tight">
                        {product?.unitPrice.toLocaleString()} <span className="tugrug-symbol">₮</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="latest-nav-products">
          <h5>Сүүлд ирсэн</h5>
          <div className="flex">
            {navProducts &&
              navProducts?.map((product: any) => (
                <div className="flex-col justify-center items-center gap-5 inline-flex nav-product" key={product._id}>
                  <Link href={'/products/' + product._id}>
                    <div className="img-wrapper">
                      <Image
                        className="nav-product-img rounded-2xl"
                        src={readFile((product.attachment || {}).url || '')}
                        alt="pic"
                        width={150}
                        height={150}
                      />
                    </div>
                    <div className="flex-col justify-start items-center  flex">
                      <h6>{product?.name}</h6>
                      <div className="text-yellow-400 text-lg font-bold leading-7 tracking-tight">
                        {product?.unitPrice.toLocaleString()} <span className="tugrug-symbol">₮</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavProductsContainer;
