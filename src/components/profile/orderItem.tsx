import Link from 'next/link';
import dayjs from 'dayjs';
import OrderStatus from './orderStatus';
import { formatCurrency } from 'utils';

const OrderItem = ({
  modifiedAt,
  paidDate,
  status,
  totalAmount,
  _id,
  number
}: any) => {
  return (
    <Link
      href={`/profile/orders/${_id}`}
      className="-order-item row p-4 rounded text-black"
    >
      <div className="col-12 col-md-3">
        <p className="text-mid-gray">Огноо</p>
        <div className="pt-1">
          {dayjs(modifiedAt).format('YYYY-MM-DD HH:mm')}
        </div>
      </div>
      <div className="col-12 col-md-3">
        <p className="text-mid-gray">Захиалгын дугаар</p>
        <div className="pt-1">{number}</div>
      </div>
      <div className="col-6 col-md-3">
        <p className="text-white">Захиалгын төлөв</p>
        <OrderStatus paidDate={paidDate} status={status} />
      </div>
      <div className="col-6 col-md-3 text-right">
        <p className="text-mid-gray">Дүн</p>
        <div className="pt-1">{formatCurrency(totalAmount)}</div>
      </div>
    </Link>
  );
};

export default OrderItem;
