import { formatCurrency } from 'utils';
import Actions from './Actions';
import { useDetailContext } from './Context';
import AddToWishlist from 'modules/Products/AddToWishlist';
import Share from 'modules/Products/Share';
import clsx from 'clsx';
import Rating from 'modules/Products/Rating';
import { useQuery } from '@apollo/client';
import { getPricingPlans } from 'modules/wholeSale/graphql/queries';

import { useRouter } from 'next/router';
import useCountDownTimer from 'lib/useCountDownHook';
import { useEffect, useState } from 'react';

const Info = ({ productId }) => {
  const router = useRouter();
  const [productType, setProductType] = useState('normal');
  const { data: pricingData } = useQuery(getPricingPlans, {
    variables: {
      productId,
      status: 'active',
      isQuantityEnabled: router.query.wholesale === 'true' ? true : false,
    },
  });

  const pricingPlan = pricingData?.pricingPlans[0] || null;

  useEffect(() => {
    if (pricingPlan?.quantityRules.length == 0) {
      setProductType('sale');
    } else if (pricingPlan?.quantityRules.length > 0) {
      setProductType('wholesale');
    } else {
      setProductType('normal');
    }
  }, [pricingPlan]);

  const { name, code, unitPrice, remainder, description } = useDetailContext();

  const isWholeSale = productType === 'wholesale';
  const isSale = productType === 'sale';
  const saleTime = pricingPlan?.endDate || '';
  const { isFinished, countDown } = useCountDownTimer(saleTime, () => console.log('finished'));

  const salePrice = unitPrice - (unitPrice * pricingPlan?.value) / 100;

  const isNameLong = name.length > 25;

  return (
    <div className="col-12 col-md-6 px-md-4 prDtl-actions mt-3 mt-md-0">
      <div className={clsx('flex justify-between', isNameLong ? 'items-start' : 'items-center')}>
        {isNameLong ? <h5>{name}</h5> : <h4>{name}</h4>}
        <AddToWishlist className={isNameLong ? '-long' : undefined} />
      </div>
      <Share />
      <p className="prDtl-code">Бүтээгдэхүүний код: {code}</p>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <h4 className={` ${isWholeSale || isSale ? 'old-price' : ''}`}>{formatCurrency(unitPrice)}</h4>
          {isWholeSale && <span className="wholesale-badge"> {pricingPlan.value} % хямдруулаад бөөндөөд ав.</span>}
          {isSale && <span className="wholesale-badge"> {pricingPlan.value} % хямдрал</span>}
        </div>

        {isWholeSale && <h5 className=" text-blue-500 pl-2"> {countDown}</h5>}
      </div>

      <div>{isWholeSale || (isSale && <h3 className=" text-red-500 new-price ">{formatCurrency(salePrice)}</h3>)}</div>

      <Rating productId={productId} />
      {remainder > 0 ? (
        <div className="prDtl-remainder py-3 mb-2 sbt">
          Таны сонгосон бараа агуулахад: <b className="mx-1">{remainder}ш</b> байна.
        </div>
      ) : (
        <div className="prDtl-remainder py-3 mb-2 sbt">Таны сонгосон бараа агуулахад одоогоор ирээгүй байна.</div>
      )}
      {remainder > 0 && <Actions productId={productId} />}
    </div>
  );
};

export default Info;
