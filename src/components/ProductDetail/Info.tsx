import { formatCurrency } from 'utils';
import Actions from './Actions';
import { useDetailContext } from './Context';
import AddToWishlist from 'modules/Products/AddToWishlist';
import Share from 'modules/Products/Share';
import clsx from 'clsx';
import Rating from 'modules/Products/Rating';

const Info = ({ productId }) => {
  const { name, code, unitPrice, remainder, description } = useDetailContext();
  const salePrice = unitPrice - (unitPrice * 10) / 100;
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
        <h6 className="my-3">
          {formatCurrency(unitPrice)}{' '}
          <span className="rounded-md bg-red-500 text-white h-24 w-24 text-xs ">
            10% хямдарлалаа
          </span>
        </h6>

        <h3 className=" text-blue-500 pl-5"> 10:08:07:56</h3>
      </div>

      <div>
        <h3 className=" text-red-500 ">{formatCurrency(salePrice)}</h3>
      </div>

      <Rating productId={productId} />

      <div className="prDtl-remainder py-3 mb-2 sbt">
        Таны сонгосон бараа агуулахад: <b className="mx-2">{remainder || 0}ш</b>{' '}
        байна.
      </div>
      <Actions />
    </div>
  );
};

export default Info;
