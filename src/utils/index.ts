import type {
  ICartItem,
  IAddItem,
  IChangeCount,
  IOrderItemResponse,
} from 'modules/types';
import { IOrderItem } from '../modules/types';

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
        .replaceAll(',', splitter ? splitter : `'`) + ' ₮'
    : '0';
};

export const getTotalValue = (arr: IOrderItem[]) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return 0;
  }
  return arr.reduce(
    (total, { unitPrice, count }) => total + unitPrice * count,
    0
  );
};

export const getLocal = (name: string) => {
  if (typeof window !== 'undefined') {
    try {
      return (
        !!localStorage.getItem(name) &&
        JSON.parse(localStorage.getItem(name) || '')
      );
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

export const changeCount = ({ product, cart, onCompleted }: IChangeCount) => {
  const { productId, count } = product;

  let newCart = cart;

  if (count === 0) {
    newCart = cart.filter((item) => item.productId !== productId);
  }

  if (count > 0) {
    newCart = cart.map((item) => {
      if (item.productId === productId) {
        return { ...item, count };
      }
      return item;
    });
  }

  if (onCompleted) return onCompleted(newCart);

  return newCart;
};

export const addToCart = ({ product, cart, onCompleted }: IAddItem) => {
  const prevItem = cart.find(({ productId }) => productId === product._id);

  if (prevItem) {
    const { productId, count } = prevItem;
    return changeCount({
      product: { productId, count: count + product.count },
      cart,
      onCompleted,
    });
  }
  const cartItem = {
    ...product,
    _id: Math.random().toString(),
    productId: product._id,
  };

  if (onCompleted) return onCompleted([...cart, cartItem]);
  return [...cart, cartItem];
};

export const cleanCart = (cart: ICartItem[]) =>
  cart.map(({ _id, productId, count, unitPrice }) => ({
    _id,
    productId,
    count,
    unitPrice,
  }));

export const filterItems: (
  items: ICartItem[] | IOrderItemResponse[]
) => IOrderItem[] = (items) =>
  items.map(({ _id, count, productId, unitPrice }) => ({
    _id,
    count,
    productId,
    unitPrice,
  }));

// (items: ICartItem[]) => TFormattedItem[]

export const formatItems: (items: IOrderItemResponse[]) => ICartItem[] = (
  items
) =>
  items.map(
    ({ _id, count, productId, productImgUrl, productName, unitPrice }) => ({
      _id,
      count,
      productId,
      productImgUrl,
      name: productName,
      unitPrice,
    })
  );

type TCoordinate = {
  lat: number;
  lng: number;
};

export function getDistanceFromLatLonInM(
  coordination1: TCoordinate,
  coordination2: TCoordinate
) {
  const { lat: lat1, lng: lon1 } = coordination1;
  const { lat: lat2, lng: lon2 } = coordination2;
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance * 1000;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export const readFile = (url: string = '') => {
  const READ_FILE = '/read-file?key=';

  if ((url || '').includes(READ_FILE)) {
    const apiUrl = url.split(READ_FILE)[0];
    return url.replace(apiUrl, process.env.NEXT_PUBLIC_ERXES_API_URL || '');
  }
  if (!(url || '').includes('http') && !url.startsWith('/'))
    return process.env.NEXT_PUBLIC_ERXES_API_URL + READ_FILE + url;
  return url;
};

export const isBlank = (link) => (link.includes('http') ? '_blank' : undefined);

export const getCookie = (name: string) => {};
