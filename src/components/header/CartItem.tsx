import CountBtn from 'components/checkout/countBtn';
import Link from 'next/link';
import Image from 'ui/Image';
import { formatCurrency, readFile } from 'utils';

const CartItem = ({
  productImgUrl,
  productId,
  name,
  count,
  unitPrice,
}: any) => {
  return (
    <div className="row cart-item py-2">
      <div className="col-3">
        <div className="img-wrap ratio ratio1x1">
          <Image
            src={readFile(productImgUrl || '')}
            alt=""
            sizes="(max-width: 768px) 33vw, 10vw"
          />
        </div>
      </div>
      <div className="col-9 ps-3">
        <Link
          href={`/product/${productId}`}
          className="cart-item-title mb-2 block"
        >
          {name}
        </Link>
        <div className="flex items-stretch justify-between">
          <div>
            <small className="block">
              <span className="text-mid-gray">{formatCurrency(unitPrice)}</span>
              <span className="text-blue block">
                <b className="pe-1 ">{count} </b>
                <span>ширхэг</span>
              </span>
            </small>
          </div>

          <CountBtn productId={productId} count={count} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
