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

export type AddressFormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  street: string;
  details: string;
  registerNumber: string;
  companyName: string;
};

export type IOrder = {
  items: ICartItem[];
  registerNumber: string | null;
  billType: string | null;
  deliveryInfo: (AddressFormData & { description: string }) | null;
  _id: string;
};
