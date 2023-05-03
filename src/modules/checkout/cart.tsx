import OrderItem from 'modules/checkout/OrderItem';
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
