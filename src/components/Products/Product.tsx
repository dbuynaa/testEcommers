import Link from 'next/link';
import Image from 'next/image';
import { formatCurrency } from 'utils';

const Product = ({ _id, name, unitPrice }: any) => {
  const price = formatCurrency(unitPrice);

  return (
    <div className="col-4 pb-4">
      <Link className="product " href={`/product/${_id}`}>
        <div className="img-wrap">
          <Image src="/images/product-6.jpeg" alt="" fill />
        </div>
        <p className="product-name mb-2 pt-3">{name}</p>
        <div className="flex items-center justify-between">
          <div className="product-price">{price}₮</div>
          <small className="product-badge badge sbt">New</small>
        </div>
      </Link>
    </div>
  );
};

export default Product;
