'use client';

import CartIcon from 'icons/Cart';
import Button from 'ui/Button';
import Dropdown from 'ui/Dropdown';
import { useCart } from 'modules/appContext';
import { useEffect } from 'react';
import Image from 'next/image';
import Empty from 'ui/Empty';
import Trash from 'icons/Trash';
import Link from 'next/link';
import { useShowCart } from 'ui/context';
import {
  cartCount,
  formatCurrency,
  cartTotalAmount,
  getLocal,
  setLocal,
} from 'utils';

const Cart = () => {
  const { cart, changeCount, changeCart } = useCart();
  const { showCart, changeShowCart } = useShowCart();

  useEffect(() => {
    const localCart = getLocal('cart');
    if (Array.isArray(localCart)) {
      changeCart(localCart);
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(cart)) {
      setLocal('cart', cart);
    }
  }, [cart]);

  const renderContent = () => {
    if (!(cart || []).length) return <Empty size="8rem" />;

    return (
      <>
        <div className="flex items-center justify-between pb-3 cart-header">
          <b>Таны сагс ( {cart.length} бүтээгдэхүүн )</b>
          <Button className="cart-clean text-blue" variant="ghost">
            Хоослох
          </Button>
        </div>
        {cart.map(({ productImageUrl, productId, name, count, unitPrice }) => (
          <Link
            href={`/product/${productId}`}
            className="row cart-item py-2"
            key={productId}
          >
            <div className="col-3">
              <div className="img-wrap ratio1x1">
                <Image src={productImageUrl} alt="" fill />
              </div>
            </div>
            <div className="col-9 ps-3">
              <div className="flex items-stretch justify-between">
                <div>
                  <p className="cart-item-title">{name}</p>
                  <small className="block mt-2">
                    <b>{formatCurrency(unitPrice)}₮</b>
                    <span className="text-mid-gray px-2">Tоо ширхэг:</span>
                    {count}
                  </small>
                </div>

                <Button
                  variant="ghost"
                  className="cart-delete"
                  onClick={() => changeCount({ productId, count: 0 })}
                >
                  <Trash />
                </Button>
              </div>
            </div>
          </Link>
        ))}
        <div className="cart-footer pt-3">
          <small className="cart-total block text-mid-gray">
            Нийт дүн:{' '}
            <b className="text-blue">
              {formatCurrency(cartTotalAmount(cart))}₮
            </b>
          </small>
          <Link className="mt-3 btn flat" href="/checkout/cart">
            Худалдан авах
          </Link>
        </div>
      </>
    );
  };

  return (
    <Dropdown
      className="cart"
      open={showCart}
      onOpenChange={changeShowCart}
      trigger={
        <Button className="cart-btn  mx-2" variant="ghost">
          {!!cartCount(cart) && <div className="badge">{cartCount(cart)}</div>}
          <CartIcon />
        </Button>
      }
    >
      {renderContent()}
    </Dropdown>
  );
};

export default Cart;
