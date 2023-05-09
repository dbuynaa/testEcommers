import CartIcon from 'icons/Cart';
import Button from 'ui/Button';
import { useCurrentUser, useCurrentOrder } from 'modules/appContext';
import {
  useItems,
  useHandleCart,
  useItemsTotal,
  useItemsCount,
} from 'modules/contextHooks';
import Image from 'ui/Image';
import Empty from 'ui/Empty';
import Link from 'next/link';
import { ICartItem } from '../../modules/types';
import { formatCurrency, readFile } from 'utils';
import { Dialog, DialogContent, DialogTrigger } from 'components/ui/Dialog';
import Xmark from 'icons/Xmark';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import LottieView from 'ui/Lottie';

const Cart = () => {
  const router = useRouter();
  const { currentUser } = useCurrentUser();
  const { currentOrder } = useCurrentOrder();
  const cart = useItems();
  const total = useItemsTotal();
  const count = useItemsCount();
  const { removeAllFromCart, loading } = useHandleCart();
  const [show, setShow] = useState(false);

  const currentCart: ICartItem[] = currentUser
    ? ((currentOrder || {}).items || []).map(
        ({ productName, ...rest }: any) => ({
          name: productName,
          ...rest,
        })
      )
    : cart || [];

  useEffect(() => {
    if (show) {
      setShow(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname]);

  const renderContent = () => {
    if (!currentCart.length)
      return (
        <div className="my-5 py-3 cart-empty">
          <LottieView
            path="https://assets2.lottiefiles.com/packages/lf20_ry4iluja.json"
            className="-empty"
          />
          <b className="my-3 sbt block">Таны сагс хоосон байна</b>
        </div>
      );

    return (
      <>
        {' '}
        <div className="cart-items">
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
                          {formatCurrency(unitPrice)}
                        </span>
                        <span className="text-blue block">
                          <b className="pe-1 ">{count}</b>
                          <span>ширхэг</span>
                        </span>
                      </small>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
        <div className="cart-footer pt-3">
          <p className="cart-total block text-mid-gray sbt">
            Нийт дүн: <b className="text-blue">{formatCurrency(total)}</b>
          </p>
          <Link className="mt-3 btn flat" href="/checkout/cart">
            Худалдан авах
          </Link>
        </div>
      </>
    );
  };

  return (
    <Dialog open={show} onOpenChange={() => setShow((prev) => !prev)}>
      <DialogTrigger asChild>
        <Button className="cart-btn mx-2" variant="ghost">
          <CartIcon />

          <small className="badge">{count ? <b>{count}</b> : <Xmark />}</small>
        </Button>
      </DialogTrigger>
      <DialogContent className="cart-body p-3">
        <div className="flex items-center justify-between pb-3 cart-header">
          <b>Захиалгын мэдээлэл</b>
          <Button
            className="cart-clean text-blue"
            variant="ghost"
            onClick={removeAllFromCart}
            loading={loading}
            disabled={!cart.length}
          >
            <b>{!loading && 'Хоослох'}</b>
          </Button>
        </div>
        {renderContent()}
      </DialogContent>
    </Dialog>
    // <Dropdown
    //   className="cart"
    //   // open={showCart}
    //   // onOpenChange={changeShowCart}
    //   trigger={
    //     <Button className="cart-btn  mx-2" variant="ghost">
    //       {!!cartCount(currentCart) && (
    //         <div className="badge">{cartCount(currentCart)}</div>
    //       )}
    //       <CartIcon />
    //       <small className="block">Сагс</small>
    //     </Button>
    //   }
    // >
    //   {renderContent()}
    // </Dropdown>
  );
};

export default Cart;
