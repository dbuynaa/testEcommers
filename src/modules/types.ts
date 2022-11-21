export type IProductBase = {
  _id: string;
  name: string;
  unitPrice: number;
  isPackage?: boolean;
};

export type ICartItem = IProductBase & {
  productId: string;
  count: number;
  productImageUrl: string;
  discountAmount?: number;
  discountPercent?: number;
  bonusCount?: number;
};
