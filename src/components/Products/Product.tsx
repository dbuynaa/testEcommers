import Link from 'next/link';
import Image from 'ui/Image';
import { formatCurrency, readFile } from 'utils';
import { IProduct } from 'modules/types';
import dayjs from 'dayjs';

const Product = ({
  _id,
  name,
  unitPrice,
  onClick,
  attachment,
  createdAt,
}: IProduct & {
  onClick?: () => void;
  attachment: { url: string };
  createdAt;
}) => {
  const price = formatCurrency(unitPrice);

  const diffInDays = dayjs().diff(dayjs(createdAt), 'day');

  return (
    <Link
      className="product text-center"
      href={{ pathname: '/products/[id]', query: { id: _id } }}
      onClick={onClick}
    >
      <div className="img-wrap">
        <Image
          src={readFile((attachment || {}).url || '')}
          alt=""
          sizes="(max-width: 768px) 50vw, (max-width: 1500px) 25vw, 20vw"
          contain
        />
      </div>
      <p className="product-name mb-1 mt-3">{name}</p>
      <div className="product-price">{price}</div>
      {diffInDays < 140 && (
        <small className="product-badge badge sbt">New</small>
      )}
    </Link>
  );
};

export default Product;
