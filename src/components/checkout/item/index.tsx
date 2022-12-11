'use client';

import Image from 'ui/Image';
import Counter from 'modules/checkout/Counter';
import type { ICartItem } from 'modules/types';
import { formatCurrency } from 'utils';

const OrderItem = ({
  productImgUrl,
  productName,
  unitPrice,
  productId,
  count,
}: ICartItem) => {
  return (
    <div className="row order-item rounded p-3 mb-2">
      <div className="col-3">
        <div className="img-wrap ratio1x1 flex justify-center items-center">
          <Image
            src={productImgUrl}
            alt="Product"
            quality={100}
            layout="fill"
            objectFit="contain"
            noWrap
          />
        </div>
      </div>
      <div className="col-4">
        <div className="mh-100 row justify-between px-3 items-center">
          <div className="text-mid-gray">
            <small>Ухаалаг утас</small>
            <big className="text-blue bold block">{productName}</big>

            {/* <h6 className=" text-black">{formatCurrency(unitPrice)}₮</h6> */}
            <small className="block">
              Боломжит үлдэгдэл:
              <span className="remainder px-2 mx-2">24ш</span>
              байна.
            </small>
          </div>
        </div>
      </div>
      <div className="col-5 flex items-stretch">
        <div className="mh-100 flex flex-col justify-between w-full py-3">
          <div className="flex justify-end w-full items-center">
            <p className="bold text-black pe-3">{formatCurrency(unitPrice)}₮</p>
            <Counter productId={productId} />
            <p className="bold text-black ps-3">
              {formatCurrency(unitPrice * count)}₮
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
