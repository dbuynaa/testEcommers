import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency, readFile } from 'utils';
import { IProduct } from 'modules/types';
import dayjs from 'dayjs';

const WholesaleProduct = ({
  _id,
  name,
  unitPrice,
  onClick,
  attachment,
  createdAt,
  wrapped,
  children,
  countDown,
  isFinished,
}: IProduct & {
  onClick?: () => void;
  attachment: { url: string };
  createdAt?: string;
  wrapped?: boolean;
  children?: React.ReactNode;
  isFinished: boolean;
  countDown: any;
}) => {
  const price = formatCurrency(unitPrice);

  const diffInDays = dayjs().diff(dayjs(createdAt), 'day');

  const render = () => (
    <Link className="product wholesale-product text-center " href={{ pathname: '/products/[id]', query: { id: _id } }} onClick={onClick}>
      {countDown && <div className="countdown">{countDown}</div>}
      <div className="img-wrapper">
        <Image src={readFile((attachment || {}).url || '')} width={250} height={200} alt="img" />
      </div>
      <p className="product-name mb-1 mt-3">{name}</p>
      <div className="product-price">
        <span className="price">{price}</span>
        <span className="sale-price">{price}</span>
      </div>
      {diffInDays < 60 && <small className="product-badge badge sbt">New</small>}
    </Link>
  );

  return wrapped ? (
    <div className={PRODUCT_WRAPPER_WHOLESALE_CLASS}>
      {render()}
      {children}
    </div>
  ) : (
    <>
      {render()}
      {children}
    </>
  );
};

export const PRODUCT_WRAPPER_WHOLESALE_CLASS = 'col-6 col-md-6 col-xl-6 px-1-5 pb-3';

export default WholesaleProduct;
