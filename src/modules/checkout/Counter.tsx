import Button from 'ui/Button';
import Input from 'ui/Input';
import Minus from 'icons/Minus';
import Plus from 'icons/Plus';
import LoadingDots from 'ui/LoadingDots';
import { useHandleCart } from 'modules/contextHooks';
import { ItemBase } from 'modules/types';

const Counter = ({ productId, count }: ItemBase) => {
  const { loading, handleUpdateCart } = useHandleCart();

  return (
    <>
      <div className="counter flex items-center px-1">
        <Button
          className="minus"
          variant="ghost"
          disabled={loading}
          onClick={() => handleUpdateCart({ productId, count: count - 1 })}
        >
          <Minus />
        </Button>
        <Input
          className="count-wrap text-center"
          value={count}
          onChange={(e) =>
            handleUpdateCart({ productId, count: +e.target.value })
          }
        />
        <Button
          className="plus"
          variant="ghost"
          disabled={loading}
          onClick={() => handleUpdateCart({ productId, count: count + 1 })}
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
