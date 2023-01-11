import Link from 'next/link';
import Image from 'ui/Image';
import { formatCurrency } from 'utils';
import { IProductBase } from '../../modules/types';

const Product = ({
  _id,
  name,
  unitPrice,
  onClick,
}: IProductBase & { onClick?: () => void }) => {
  const price = formatCurrency(unitPrice);

  return (
    <Link className="product" href={`/product/${_id}`} onClick={onClick}>
      <div className="img-wrap">
        <Image src="/images/product-6.jpeg" alt="" />
      </div>
      <p className="product-name mb-2 mt-3">{name}</p>
      <div className="flex items-center justify-between">
        <div className="product-price">{price}₮</div>
        <small className="product-badge badge sbt">New</small>
      </div>
    </Link>
  );
};

export default Product;
