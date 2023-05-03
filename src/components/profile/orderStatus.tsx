import clsx from 'clsx';

const obj = {
  new: 'Төлбөр хүлээгдэж буй', // !paidDate
  paid: 'Төлбөр төлөгдсөн', // paidDate
  doing: 'Хүргэлтэнд гарсан', // done || doing
  complete: 'Хүргэгдсэн', // complete
  pending: 'Xүлээгдэж байна'
};

const OrderStatus = ({
  paidDate,
  status,
}: {
  paidDate: string | null;
  status: string;
}) => {
  const isGreen = status !== 'new' || (status === 'new' && !!paidDate);

  const updatedStatus = !!paidDate && status === 'new' ? 'paid' : status;

  return (
    <div className="pt-1 flex items-center order-status-container">
      <span className={clsx('order-status me-2', isGreen && 'green')}></span>
      {obj[updatedStatus as keyof typeof obj]}
    </div>
  );
};

export default OrderStatus;
