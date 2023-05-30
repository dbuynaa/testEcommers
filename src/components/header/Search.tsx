import clsx from 'clsx';
import Magnify from 'icons/Magnify';
import useGetProducts from 'lib/useGetProducts';
import Product from 'components/Products/Product';
import { useState } from 'react';
import Input from 'ui/Input';
import Loading from 'ui/Loading';
import LottieView from 'ui/Lottie';
import Popover from 'ui/Popover';
import Button from 'ui/Button';
import Xmark from 'icons/Xmark';

const SearchNew = ({ desktop }: { desktop?: boolean }) => {
  const [show, setShow] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const { products, productsCount, loading, getProducts } = useGetProducts({
    searchValue,
  });

  const renderResult = () => {
    if (!searchValue)
      return (
        <div className="my-5 py-md-5">
          <LottieView path="/images/no-result.json" className="search-no" />
          <p className="text-mid-gray text-center search-no-desc block pt-3">
            Хайх утгаа оруулана уу
          </p>
        </div>
      );

    if (loading) return <Loading className="py-5 my-5" />;

    return (
      <>
        <div className="flex justify-between items-center hr pt-3 mb-3 pb-2">
          <b>Хайлтын илэрц</b>
          <small>
            <b>Бүгдийг үзэх ({productsCount.toLocaleString()})</b>
          </small>
        </div>
        <div className="row mx--2">
          {(products || []).map((el: any) => (
            <div className="col-6 col-md-4 px-1-5 pb-4" key={el._id}>
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

  const renderContent = () => (
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
  );

  return (
    <>
      {desktop && (
        <div className={clsx('search -trigger-btn ms-5 col-6 hidden-mobile')}>
          {renderContent()}
          <Input
            placeholder="Хайх..."
            value={searchValue}
            onClick={() => setShow(true)}
          />
          <Magnify />
        </div>
      )}

      {!desktop && (
        <>
          <Button
            onClick={() => setShow(true)}
            variant="ghost"
            className="search-btn hidden-desktop"
          >
            {show ? <Xmark /> : <Magnify duotone />}
          </Button>
          {renderContent()}
        </>
      )}
    </>
  );
};

export default SearchNew;
