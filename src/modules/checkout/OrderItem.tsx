import Image from 'ui/Image';
import Counter from 'modules/checkout/Counter';
import type { ICartItem } from 'modules/types';
import { formatCurrency, readFile } from 'utils';
import { useQuery } from '@apollo/client';
import { queries } from './graphql';

const OrderItem = ({
  productImgUrl,
  name,
  unitPrice,
  productId,
  count,
}: ICartItem) => {
  const { data, loading } = useQuery(queries.orderItemDetail, {
    variables: { id: productId },
  });

  if (loading)
    return (
      <div className="row order-item rounded p-3 mb-2">
        <div className="col-2">
          <div className="img-wrap ratio ratio1x1 flex justify-center items-center"></div>
        </div>
        <div className="col-10 row">
          <div className="col-12 col-md-6">
            <div className="mh-100 row justify-between px-3 items-center">
              <div className="text-mid-gray"></div>
            </div>
          </div>
          <div className="col-12 col-md-6 flex items-stretch"></div>
        </div>
      </div>
    );

  const { remainder, category } = data?.poscProductDetail || {};

  return (
    <div className="row order-item rounded p-3 mb-2">
      <div className="col-2">
        <div className="img-wrap ratio ratio1x1 flex justify-center items-center">
          <Image src={readFile(productImgUrl)} alt="Product" sizes="20vw" />
        </div>
      </div>
      <div className="col-10 row">
        <div className="col-12 col-md-6">
          <div className="mh-100 row justify-between px-3 items-center">
            <div className="text-mid-gray">
              <small>{category?.name}</small>
              <big className="text-blue bold block">{name}</big>

              <h6 className=" text-black">{formatCurrency(unitPrice)}</h6>
              <small className="block">
                Боломжит үлдэгдэл:
                <span className="remainder px-2 mx-2">{remainder}ш</span>
                байна.
              </small>
            </div>
          </div>
        </div>
        <div className="col-12 col-md-6 flex items-stretch">
          <div className="mh-100 flex flex-col justify-between w-full py-3">
            <div className="flex justify-end w-full items-center">
              <p className="bold text-black pe-3">
                {formatCurrency(unitPrice)}
              </p>
              <Counter
                productId={productId}
                count={count}
                remainder={remainder}
              />
              <p className="bold text-black ps-3">
                {formatCurrency(unitPrice * count)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
