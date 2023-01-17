'use client';
import Input from 'ui/Input';
import Magnify from 'icons/Magnify';
import { useState, Suspense } from 'react';
import clsx from 'clsx';
import useGetProducts from 'lib/useGetProducts';
import Product from 'components/Products/Product';
import Loading from 'ui/Loading';
import Empty from 'ui/Empty';
import dynamic from 'next/dynamic';
import CheckDevice from 'modules/CheckDevice';

const Popover = dynamic(() => import('ui/Popover'), {
  suspense: true,
});

const Search = () => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { products, productsCount, loading, getProducts } = useGetProducts({
    searchValue,
  });

  const renderResult = () => {
    if (!searchValue)
      return (
        <div className="my-5 py-5">
          <Empty size="8rem" message="Хайх утгаа оруулана уу" />
        </div>
      );

    if (loading) return <Loading className="py-5 my-5" />;

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
            <div className="col-6 col-md-4 p-2 p-md-3 " key={el._id}>
              <Product {...el} onClick={() => setShow(false)} />
            </div>
          ))}
        </div>
      </>
    );
  };

  const renderInput = () => (
    <>
      <Input
        placeholder="Хайх..."
        value={searchValue}
        onChange={(value) => {
          setSearchValue(value);
          getProducts();
        }}
      />
      <Magnify />
    </>
  );
  return (
    <CheckDevice
      Desktop={
        <div className="search ms-5 col-8">
          <Suspense>
            <Popover
              open={show}
              onOpenChange={() => setShow((prev) => !prev)}
              trigger={<div className="search-trigger"></div>}
              modal
            >
              <div className="p-3 flex flex-col">
                <div className={clsx('search', { show })}>{renderInput()} </div>

                {renderResult()}
              </div>
            </Popover>
          </Suspense>
          <Input
            placeholder="Хайх..."
            value={searchValue}
            onClick={() => setShow(true)}
          />
          <Magnify />
        </div>
      }
      Mobile={
        <div className="search-page pb-4">
          <div className={clsx('search m-3')}>{renderInput()}</div>
          <b className="block text-blue px-3 pb-3">Тохирох бүтээгдэхүүнүүд</b>
          <div className="px-3">{renderResult()}</div>
        </div>
      }
    />
  );
};

export default Search;
