'use client';

import CartIcon from 'icons/Cart';
import Button from 'ui/Button';
import Dropdown from 'ui/Dropdown';
import { useCart, useCurrentUser, useCurrentOrder } from 'modules/appContext';
import { useEffect } from 'react';
import Image from 'ui/Image';
import Empty from 'ui/Empty';
import Link from 'next/link';
import { useShowCart } from 'ui/context';
import { ICartItem } from '../../modules/types';
import useOrderCancel from 'lib/useOrderCancel';
import {
  cartCount,
  formatCurrency,
  cartTotalAmount,
  getLocal,
  setLocal,
  readFile,
} from 'utils';

const Cart = () => {
  const { cart, changeCart } = useCart();
  const { showCart, changeShowCart } = useShowCart();
  const { currentUser } = useCurrentUser();
  const { currentOrder } = useCurrentOrder();
  const { loading, orderCancel } = useOrderCancel();

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

  const currentCart: ICartItem[] = currentUser
    ? ((currentOrder || {}).items || []).map(
        ({ productName, ...rest }: any) => ({
          name: productName,
          ...rest,
        })
      )
    : cart || [];

  const toEmptyCart = () => {
    if (!currentUser) {
      return changeCart([]);
    }
    return orderCancel({ variables: { id: currentOrder?._id } });
  };

  const renderContent = () => {
    if (!currentCart.length) return <Empty size="8rem" />;

    return (
      <>
        <div className="flex items-center justify-between pb-3 cart-header">
          <b>Таны сагс ( {currentCart.length} бүтээгдэхүүн )</b>
          <Button
            className="cart-clean text-blue"
            variant="ghost"
            onClick={toEmptyCart}
            loading={loading}
          >
            {!loading && 'Хоослох'}
          </Button>
        </div>
        {currentCart.map(
          ({ productImgUrl, productId, name, count, unitPrice }) => (
            <div className="row cart-item py-2" key={productId}>
              <div className="col-3">
                <div className="img-wrap ratio ratio1x1">
                  <Image
                    src={readFile(productImgUrl || '')}
                    alt=""
                    sizes="(max-width: 768px) 33vw, 10vw"
                  />
                </div>
              </div>
              <div className="col-9 ps-3">
                <div className="flex items-stretch justify-between">
                  <div>
                    <Link
                      href={`/product/${productId}`}
                      className="cart-item-title"
                    >
                      {name}
                    </Link>
                    <small className="block mt-2">
                      <span className="text-mid-gray">
                        {formatCurrency(unitPrice)}₮
                      </span>
                      <span className="text-blue block">
                        <b className="pe-1 ">{count}</b>
                        <span>ширхэг</span>
                      </span>
                    </small>
                  </div>

                  {/* <Button
                    variant="ghost"
                    className="cart-delete"
                    onClick={() => changeCount({ productId, count: 0 })}
                  >
                    <Trash />
                  </Button> */}
                </div>
              </div>
            </div>
          )
        )}
        <div className="cart-footer pt-3">
          <small className="cart-total block text-mid-gray">
            Нийт дүн:{' '}
            <b className="text-blue">
              {formatCurrency(cartTotalAmount(currentCart))}₮
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
          {!!cartCount(currentCart) && (
            <div className="badge">{cartCount(currentCart)}</div>
          )}
          <CartIcon />
          <small className="block">Сагс</small>
        </Button>
      }
    >
      {renderContent()}
    </Dropdown>
  );
};

export default Cart;
