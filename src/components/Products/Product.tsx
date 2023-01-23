import Link from 'next/link';
import Image from 'ui/Image';
import { formatCurrency, readFile } from 'utils';
import { IProductBase } from '../../modules/types';

const Product = ({
  _id,
  name,
  unitPrice,
  onClick,
  attachment,
}: IProductBase & { onClick?: () => void; attachment: { url: string } }) => {
  const price = formatCurrency(unitPrice);

  return (
    <Link className="product" href={`/product/${_id}`} onClick={onClick}>
      <div className="img-wrap">
        <Image
          src={readFile((attachment || {}).url || '')}
          alt=""
          sizes="(max-width: 768px) 50vw, (max-width: 1500px) 25vw, 20vw"
        />
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
