export type IProductBase = {
  _id: string;
  name: string;
  unitPrice: number;
  isPackage?: boolean;
};

export type ICartItem = IProductBase & {
  productName?: string;
  productId: string;
  count: number;
  productImgUrl: string;
  discountAmount?: number;
  discountPercent?: number;
  bonusCount?: number;
};

export type IOrder = {
  items: ICartItem[];
  registerNumber: string | null;
  billType: string | null;
  deliveryInfo: { description: string } | '';
  _id: string;
};
