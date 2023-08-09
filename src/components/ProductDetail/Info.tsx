import { formatCurrency } from 'utils';
import Actions from './Actions';
import { useDetailContext } from './Context';
import AddToWishlist from 'modules/Products/AddToWishlist';
import Share from 'modules/Products/Share';
import clsx from 'clsx';
import Rating from 'modules/Products/Rating';
import { useWholeSaleProductDetail } from 'modules/appContext';
import { useQuery } from '@apollo/client';
import { getPricingPlans } from 'modules/wholeSale/graphql/queries';

import { useRouter } from 'next/router';
import useCountDownTimer from 'lib/useCountDownHook';
import { useMemo } from 'react';

const Info = ({ productId }) => {
  const { setWholeSaleProductDetail } = useWholeSaleProductDetail();
  const router = useRouter();

  const isWholeSale = useMemo(() => {
    return router.query?.wholesale === 'true';
  }, [router.query]);

  const isSale = useMemo(() => {
    return router.query.sale === 'true';
  }, [router.query]);
  console.log('isSale==========', isSale);

  console.log(isWholeSale, 'wholsale');

  console.log('router', router);
  const { data: pricingData } = useQuery(getPricingPlans, {
    variables: {
      productId,
      status: 'active'
    }
  });

  const { name, code, unitPrice, remainder, description } = useDetailContext();

  const saleTime = pricingData?.pricingPlans[0]?.endDate || '';
  const { isFinished, countDown } = useCountDownTimer(saleTime, () =>
    console.log('finished')
  );

  const wholeSalePercentage =
    pricingData?.pricingPlans[0]?.quantityRules[0]?.discountValue || 0;
  const salePrice = unitPrice - (unitPrice * wholeSalePercentage) / 100;
  const totalQuantity =
    pricingData?.pricingPlans[0]?.quantityRules[0]?.value || 0;

  const salePercentage = pricingData?.pricingPlans[0]?.discountValue || 0;
  console.log('sale============', salePercentage);

  const isNameLong = name.length > 25;

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
      <div className="grid grid-cols-2 gap-5">
        <h6>
          {isWholeSale || (isSale && formatCurrency(unitPrice))}
          {!isWholeSale ||
            (!isSale && <h4 className="my-3"> {formatCurrency(unitPrice)}</h4>)}
          {isWholeSale ||
            (isSale && (
              <span className="rounded-md bg-red-500 text-white h-24 w-24 text-xs px-1 ">
                {wholeSalePercentage} % хямдарлалаа
              </span>
            ))}
        </h6>

        {isWholeSale && <h3 className=" text-blue-500 pl-5"> {countDown}</h3>}
      </div>

      <div>
        {isWholeSale && (
          <h3 className=" text-red-500 ">{formatCurrency(salePrice)}</h3>
        )}
      </div>

      <Rating productId={productId} />
      {isWholeSale && (
        <div className="prDtl-remainder py-3 mb-2 sbt">
          {' '}
          Таны сонгосон бараа <b className="mx-2">{totalQuantity || 0}ш</b>{' '}
          байна.
        </div>
      )}
      {!isWholeSale && (
        <div className="prDtl-remainder py-3 mb-2 sbt">
          Таны сонгосон бараа агуулахад:{' '}
          <b className="mx-2">{remainder || 0}ш</b> байна.
        </div>
      )}
      <Actions productId={productId} />
    </div>
  );
};

export default Info;
