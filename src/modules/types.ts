export type IProductBase = {
  _id: string;
  unitPrice: number;
};

export type IProduct = IProductBase & {
  name: string;
  code?: string;
  productCount?: number;
  attachment: {
    url: string;
  };
  remainder?: number;
};

export type ItemBase = {
  count: number;
  productId: string;
  remainder?: number;
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
  id?: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  registerNumber: string;
  companyName: string;
  address: {
    city: string;
    city_district: string;
    street: string;
    others: string;
  };
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
