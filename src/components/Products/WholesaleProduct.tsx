import Link from 'next/link';
import Image from '../../components/ui/Image';
import { formatCurrency, readFile } from 'utils';
import { IProduct } from 'modules/types';
import CountDown from 'modules/wholeSale/components/CountDown';
import { useQuery } from '@apollo/client';
import { getPricingPlans } from 'modules/wholeSale/graphql/queries';

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

  const { data } = useQuery(getPricingPlans, {
    variables: {
      status: 'active',
      isQuantityEnabled: true,
      productId: _id,
      findOne: true,
    },
  });

  const pricingPlan = data?.pricingPlans[0] || null;
  const salePercentage = pricingPlan?.value || null;
  const endDate = pricingPlan?.endDate || null;
  const salePrice = unitPrice - (unitPrice * salePercentage) / 100;
  const render = () => (
    <Link
      className="product wholesale-product text-center "
      href={{ pathname: '/products/[id]', query: { id: _id, wholesale: 'true' } }}
      onClick={onClick}
    >
      {
        <div className="countdown">
          <CountDown big={false} endDate={endDate} />
        </div>
      }
      <div className="img-wrapper">
        <Image src={readFile((attachment || {}).url || '')} width={250} height={200} alt="img" />
      </div>
      <p className="product-name mb-1 mt-3">{name}</p>
      <div className="product-price">
        <span className="price">{price}</span>
        <span className="sale-price">{formatCurrency(salePrice)}</span>
      </div>
      {<small className="product-badge badge sbt product-sale-badge">sale {salePercentage} %</small>}
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
