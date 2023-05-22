import Button from 'ui/Button';
import Input from 'ui/Input';
import Minus from 'icons/Minus';
import Plus from 'icons/Plus';
import LoadingDots from 'ui/LoadingDots';
import { useHandleCart } from 'modules/contextHooks';
import { ItemBase } from 'modules/types';
import { toast } from 'react-toastify';

const Counter = ({ productId, count, remainder }: ItemBase) => {
  const { loading, handleUpdateCart: updateCart } = useHandleCart();

  const handleUpdateCart = (val) => {
    const num = parseInt(val || '0');

    if ((remainder || 0) >= num) {
      return updateCart({ productId, count: num });
    }
    return toast.error('Бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна');
  };

  return (
    <>
      <div className="counter flex items-center px-1">
        <Button
          className="minus"
          variant="ghost"
          disabled={loading}
          onClick={() => handleUpdateCart(count - 1)}
        >
          <Minus />
        </Button>
        <Input
          className="count-wrap text-center"
          value={count}
          onChange={(value) => handleUpdateCart(value)}
        />
        <Button
          className="plus"
          variant="ghost"
          disabled={loading}
          onClick={() => handleUpdateCart(count + 1)}
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
