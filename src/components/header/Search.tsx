'use client';
import Input from 'ui/Input';
import Magnify from 'icons/Magnify';
import Popover from 'ui/Popover';
import { useState } from 'react';
import clsx from 'clsx';
import useGetProducts from 'lib/useGetProducts';
import Product from 'components/Products/Product';
import Loading from 'ui/Loading';
import Empty from 'ui/Empty';

const Search = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { products, productsCount, loading, getProducts } = useGetProducts({
    searchValue,
  });

  const renderResult = () => {
    if (!searchValue)
      return <Empty size="8rem" message="Хайх утгаа оруулана уу" />;

    if (loading) return <Loading />;

    return (
      <>
        <div className="flex justify-between items-center hr pt-3 pb-2">
          <b>Хайлтын илэрц</b>
          <small>
            <b>Бүгдийг үзэх ({productsCount.toLocaleString()})</b>
          </small>
        </div>
        <div className="row">
          {(products || []).map((el: any) => (
            <div className="col-3 p-3" key={el._id}>
              <Product {...el} onClick={() => setShow(false)} />
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="search ms-5">
      <Popover
        open={show}
        onOpenChange={() => setShow((prev) => !prev)}
        trigger={<div className="search-trigger"></div>}
        modal
      >
        <div className="p-3 flex flex-col">
          <div className={clsx('search', { show })}>
            <Input
              placeholder="Хайх..."
              value={searchValue}
              onChange={(value) => setSearchValue(value)}
            />
            <Magnify />
          </div>
          {renderResult()}
        </div>
      </Popover>
      <Input
        placeholder="Хайх..."
        value={searchValue}
        onClick={() => setShow(true)}
      />
      <Magnify />
    </div>
  );
};

export default Search;
