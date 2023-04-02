export type IProductBase = {
  _id: string;
  unitPrice: number;
};

export type IProduct = IProductBase & {
  name: string;
  code?: string;
  attachment: {
    url: string;
  };
};

export type ItemBase = {
  count: number;
  productId: string;
};

export type IOrderItem = IProductBase & ItemBase;

export type IOrderItemResponse = IOrderItem & {
  productName: string;
  productImgUrl: string;
};

export type ICartItem = IOrderItem & {
  productImgUrl?: string;
  name: string;
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
  marker: {
    lat: number;
    lng: number;
  };
};

export type IOrder = {
  items: IOrderItemResponse[];
  registerNumber: string | null;
  billType: string | null;
  deliveryInfo: (AddressFormData & { description: string }) | null;
  _id: string;
};

export type IHandleOrderBase = {
  onCompleted?: any;
};

export type IAddItem = IHandleOrderBase & {
  cart: ICartItem[] | IOrderItem[];
  product: (IProduct & ItemBase) | ICartItem;
};

export type IChangeCount = IHandleOrderBase & {
  cart: IOrderItem[];
  product: ItemBase;
};
