import React from 'react';

import AddToWishlist from 'modules/Products/AddToWishlist';
import Share from 'modules/Products/Share';
import clsx from 'clsx';
import Rating from 'modules/Products/Rating';

import WholeAction from './WholeAction';
import { useDetailContext } from 'components/ProductDetail/Context';
import { useWholeSaleProductDetail } from 'modules/appContext';

const WholeInfo = ({ productId }) => {

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { name, code, unitPrice} = useDetailContext();
   const {...store }= useWholeSaleProductDetail() 


  // eslint-disable-next-line react-hooks/rules-of-hooks

  const isNameLong = name.length > 25;
  // const hi = wholeProduct?.productDetail?.quantityRules[0]?.discountValue;

  // const disPrice = wholeProduct?.unitPrice;
  // const salePrice = disPrice - (disPrice * hi) / 100;
  // console.log('salePrice', salePrice);

  return (
    <div className="col-12 col-md-6 px-md-4 prDtl-actions mt-3 mt-md-0">
      <div
        className={clsx(
          'flex justify-between',
          isNameLong ? 'items-start' : 'items-center'
        )}
      >
        {isNameLong ? <h5>{name}</h5> : <h4>{name}</h4>}
        <AddToWishlist className={isNameLong ? '-long' : undefined} />
      </div>
      <Share />
      <p className="prDtl-code">Бүтээгдэхүүний код: {code}</p>
      <h4 className="my-3">{unitPrice}</h4>
      {/* <h3 className="text-red-500">{salePrice}</h3> */}
      <Rating productId={productId} />

      <WholeAction />
    </div>
  );
};

export default WholeInfo;
