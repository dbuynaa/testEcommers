import Button from 'ui/Button';
import Input from 'ui/Input';
import Minus from 'icons/Minus';
import Plus from 'icons/Plus';
import { useDetailContext } from 'components/ProductDetail/Context';

const Counter = ({ count, setCount }: { count: number; setCount: any }) => {
  const { remainder } = useDetailContext();
  return (
    <div className="counter flex items-center px-1">
      <Button
        className="minus"
        variant="ghost"
        disabled={count <= 1}
        onClick={() => count >= 2 && setCount((num: number) => num - 1)}
      >
        <Minus />
      </Button>
      <Input
        className="count-wrap text-center"
        value={count}
        onChange={(val: string) => {
          const num = parseInt(val);
          return !isNaN(num) && num >= 1 && setCount(num);
        }}
      />
      <Button
        className="plus"
        variant="ghost"
        onClick={() => setCount((num: number) => num + 1)}
        disabled={remainder < count + 1}
      >
        <Plus />
      </Button>
    </div>
  );
};

export default Counter;
