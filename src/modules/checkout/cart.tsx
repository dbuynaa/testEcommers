import OrderItem from 'components/checkout/item';
import { useItems } from 'modules/contextHooks';

const CartContainer = () => {
  const items = useItems();
  return (
    <>
      {items.map((item) => (
        <OrderItem {...item} key={item._id} />
      ))}
    </>
  );
};

export default CartContainer;
