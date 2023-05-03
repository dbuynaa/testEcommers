import { ICartItem } from 'modules/types';
import { formatCurrency } from 'utils';
import { useItems, useItemsTotal } from 'modules/contextHooks';
import clsx from 'clsx';

const Summary = ({ className }: { className?: string }) => {
  const cart = useItems();
  const total = useItemsTotal();

  return (
    <div className={clsx('sum mb-3', className)}>
      <div className="order-info p-md-3 rounded">
        {cart.map(({ _id, name, count, unitPrice }: ICartItem) => (
          <div className="row mb-1 " key={_id}>
            <span className="col-6">{name}</span>
            <div className="flex justify-between col-6">
              <span>x{count}</span>
              <span>{formatCurrency(unitPrice * count)}</span>
            </div>
          </div>
        ))}
        <div className="hr pt-2"></div>
        <div className="pt-3 flex justify-end">
          <b>Нийт дүн: {formatCurrency(total)}</b>
        </div>
      </div>
    </div>
  );
};

export default Summary;
