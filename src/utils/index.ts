import type { ICartItem } from 'modules/types';

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
