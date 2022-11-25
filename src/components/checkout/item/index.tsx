'use client';

import { useState } from 'react';
import Image from 'next/image';
import Counter from 'ui/Counter';
import Button from 'ui/Button';

const OrderItem = () => {
  const [count, setCount] = useState(1);
  return (
    <div className="row order-item rounded p-3 mb-2">
      <div className="col-3">
        <div className="img-wrap ratio1x1">
          <Image
            src={`/images/product-${Math.ceil(Math.random() * 4)}.png`}
            alt="Product"
            quality={100}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>
      <div className="col-9">
        <div className="mh-100 row justify-between px-3 items-center">
          <div className="text-mid-gray">
            <h5 className="text-black">Xiaomi Mi 11T</h5>
            <small>Ухаалаг утас</small>
            <h6 className="bold text-black">2,199,800₮</h6>
            <small>Хүргэлтийн хугацаа 2 хоног.</small>
            <small className="block">
              Боломжит үлдэгдэл:
              <span className="remainder px-2 mx-2">24ш</span>
              байна.
            </small>
          </div>
          <Counter count={count} setCount={setCount} />
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
