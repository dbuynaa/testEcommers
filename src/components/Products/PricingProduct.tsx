import Link from 'next/link';
import Image from 'ui/Image';
import { formatCurrency, readFile } from 'utils';
import { IProduct } from 'modules/types';
// import { queries } from 'modules/Products/graphql';
// import { useQuery } from '@apollo/client';

const PricingProduct = ({
  _id,
  name,
  unitPrice,
  onClick,
  attachment,
  wrapped,
  children,
  productId
}: IProduct & {
  onClick?: () => void;
  attachment: { url: string };
  wrapped?: boolean;
  children?: React.ReactNode;
  productId: string;
}) => {
  const price = formatCurrency(unitPrice);

  const render = () => (
    <Link
      className="product text-center "
      href={`products/${_id}?sale=true`}
      onClick={onClick}
    >
      <div className="img-wrap">
        <Image
          src={readFile((attachment || {}).url || '')}
          alt=""
          sizes="(max-width: 768px) 50vw, (max-width: 1500px) 25vw, 20vw"
          contain
          withLoader
          className=" hover:scale-105 transition duration-100 cursor-pointer ease-in"
        />
      </div>
      <p className="product-name mb-1 mt-3">{name}</p>

      <div className="product-price">
        {price}
        <span className="text-red-500"></span>
      </div>

      <small className="product-badgeRed badge sbt ">Sale</small>
    </Link>
  );

  return wrapped ? (
    <div className={PRODUCT_WRAPPER_CLASS}>
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

export const PRODUCT_WRAPPER_CLASS = 'col-6 col-md-4 col-xl-3 px-1-5 pb-4';

export default PricingProduct;
