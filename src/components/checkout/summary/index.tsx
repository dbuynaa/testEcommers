import { ICartItem } from 'modules/types';
import { formatCurrency } from 'utils';
import { useItems, useItemsTotal } from 'modules/contextHooks';
import clsx from 'clsx';
import Image from 'ui/Image';

const Summary = ({ className }: { className?: string }) => {
  const cart = useItems();
  const total = useItemsTotal();
  console.log(cart, 'cart');
  return (
    <div className={clsx('sum mb-3', className)}>
      <div className="order-info p-md-3 rounded">
        {cart.map(({ _id, name, count, unitPrice, productImgUrl }: ICartItem) => (
          <div key={_id} className="row" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.08)', paddingTop: 10, paddingBottom: 10 }}>
            <div className="col-3">
              <Image src={productImgUrl ?? ''} width={100} height={100} alt={name} />
            </div>
            <div className="col-9">
              <div className="row mb-1 flex items-center h-full" key={_id}>
                <span className="col-6 text-sm">{name}</span>
                <div className="flex justify-between items-center col-6">
                  <span>x{count}</span>
                  <span>
                    <strong>{formatCurrency(unitPrice * count)}</strong>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="pt-3 flex justify-end">
          <b>Нийт дүн: {formatCurrency(total)}</b>
        </div>
      </div>
    </div>
  );
};

export default Summary;
