import type { ICartItem, IProductBase } from 'modules/types';

export const formatCurrency = (
  num: number | string,
  splitter?: any
): string => {
  const checked = typeof num === 'string' ? Number(num) : num;

  return checked
    ? checked
        .toLocaleString(
          undefined,
          splitter && {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }
        )
        .replaceAll(',', splitter ? splitter : ' ')
    : '0';
};

export const cartCount = (cart: ICartItem[]) =>
  cart.reduce((totalCount: number, { count }) => totalCount + count, 0);

export const cartTotalAmount = (cart: ICartItem[]) =>
  cart.reduce(
    (totalCount: number, { count, unitPrice }) =>
      count * unitPrice + totalCount,
    0
  );

export const getLocal = (name: string) => {
  if (typeof window !== 'undefined') {
    try {
      return JSON.parse(localStorage.getItem(name) || '');
    } catch (error) {
      console.error('error', error);
    }
  }
};

export const setLocal = (name: string, value: any) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(name, JSON.stringify(value));
  }
};

type ICartUtil = {
  product: IProductBase & {
    productImgUrl: string;
    count: number;
    productId?: string;
  };
  cart: ICartItem[] | null;
  onCompleted?: any;
};

export const findItem: (
  cart: ICartItem[],
  productId: string
) => ICartItem | undefined = (cart, productId) => {
  return cart.find((item) => item.productId === productId);
};

export const changeCount = ({
  product,
  cart,
  onCompleted,
}: {
  product: { productId: string; count: number };
  cart: ICartItem[] | null;
  onCompleted?: (cart: ICartItem[]) => any;
}) => {
  const currentCart = (cart || []).slice();

  const foundItem = findItem(currentCart, product.productId);

  if (foundItem) {
    if (product.count > 0) {
      foundItem.count = product.count;
    } else {
      const index = currentCart.indexOf(foundItem);
      currentCart.splice(index, 1);
    }

    if (onCompleted) return onCompleted(currentCart);

    return currentCart;
  }
};

export const addToCart = ({ product, cart, onCompleted }: ICartUtil) => {
  const currentCart = (cart || []).slice();

  console.log(currentCart, 'in add to');
  const foundItem = findItem(cart || [], product._id);

  if (foundItem) {
    return changeCount({
      product: { productId: product._id, count: product.count },
      cart,
      onCompleted,
    });
  }

  const cartItem = {
    ...product,
    _id: Math.random().toString(),
    productId: product.productId || product._id,
    isTake: true,
  };
  currentCart.push(cartItem);

  if (onCompleted) return onCompleted(currentCart);

  return currentCart;
};

export const cleanCart = (cart: ICartItem[]) =>
  cart.map(({ _id, productId, count, unitPrice }) => ({
    _id,
    productId,
    count,
    unitPrice,
  }));

export const readFile = (url: string = '') => {
  const READ_FILE = '/read-file?key=';
  if ((url || '').includes(READ_FILE)) {
    const apiUrl = url.split(READ_FILE)[0];
    return url.replace(apiUrl, process.env.NEXT_PUBLIC_ERXES_API_URL || '');
  }
  return url;
};
