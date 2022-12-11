import Button from 'ui/Button';
import Input from 'ui/Input';
import Minus from 'icons/Minus';
import Plus from 'icons/Plus';
import useOrderData from 'lib/useOrderData';
import useOrderCU from 'lib/useOrderCU';
import { findItem, changeCount, cleanCart } from 'utils';
import LoadingDots from 'ui/LoadingDots';

const Counter = ({ productId }: { productId: string }) => {
  const orderData = useOrderData();
  const { cart } = orderData;
  const { orderCU, loading } = useOrderCU();
  const cartItem = findItem(cart, productId);

  const handleChange = (number: number) => {
    const newCart = changeCount({
      cart,
      product: { productId, count: number },
    });
    orderCU({ variables: { ...orderData, items: cleanCart(newCart) } });
  };

  return (
    <>
      <div className="counter flex items-center px-1">
        <Button
          className="minus"
          variant="ghost"
          disabled={loading}
          onClick={() => handleChange((cartItem?.count || 0) - 1)}
        >
          <Minus />
        </Button>
        <Input
          className="count-wrap text-center"
          value={cartItem?.count}
          onChange={(val: string) => {
            const num = parseInt(val);
            if (!isNaN(num)) {
              handleChange(num);
            }
          }}
        />
        <Button
          className="plus"
          variant="ghost"
          disabled={loading}
          onClick={() => handleChange((cartItem?.count || 0) + 1)}
        >
          <Plus />
        </Button>
      </div>
      {loading && (
        <div className="order-item-loader flex items-center justify-center rounded">
          <LoadingDots />
        </div>
      )}
    </>
  );
};

export default Counter;
