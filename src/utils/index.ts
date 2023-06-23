import type {
  ICartItem,
  IAddItem,
  IChangeCount,
  IOrderItemResponse,
} from 'modules/types';
import { IOrderItem } from '../modules/types';
import { toast } from 'react-toastify';

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
  if (!(url || '').includes('http') && !(url || '').startsWith('/'))
    return process.env.NEXT_PUBLIC_ERXES_API_URL + READ_FILE + url;
  return url;
};

export const isBlank = (link) =>
  (link || '').includes('http') ? '_blank' : undefined;

export const getCookie = (name: string) => {};

const API_URL = process.env.NEXT_PUBLIC_ERXES_API_URL;

type FileInfo = {
  name: string;
  size: number;
  type: string;
  duration: number;
};

type AfterUploadParams = {
  status: 'ok' | 'error';
  response: any;
  fileInfo: FileInfo;
};

type AfterReadParams = {
  result: any;
  fileInfo: FileInfo;
};

type Params = {
  files: any[] | null;
  beforeUpload: () => void;
  afterUpload: (params: AfterUploadParams) => void;
  afterRead?: (params: AfterReadParams) => void;
  url?: string;
  kind?: string;
  userId?: string;
  responseType?: string;
  extraFormData?: Array<{ key: string; value: string }>;
};

export const uploadHandler = async (params: Params) => {
  const {
    files,
    beforeUpload,
    afterUpload,
    afterRead,
    url = `${API_URL}/upload-file`,
    kind = 'main',
    responseType = 'text',
    userId,
    extraFormData = [],
  } = params;

  if (!files) {
    return;
  }

  if (files.length === 0) {
    return;
  }

  // tslint:disable-next-line
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    // initiate upload file reader
    const uploadReader = new FileReader();

    let fileInfo = {
      name: file.name,
      size: file.size,
      type: file.type,
      duration: 0,
    } as any;

    if (file.type.includes('audio') || file.type.includes('video')) {
      const duration = await getVideoDuration(file);

      fileInfo = { ...fileInfo, duration };
    }

    const fileUploadMaxSize = 20 * 1024 * 1024;

    // skip file that size is more than REACT_APP_FILE_UPLOAD_MAX_SIZE
    if (fileInfo.size > fileUploadMaxSize) {
      toast.warning(
        `Your file ${fileInfo.name} size is too large. Upload files less than ${
          fileUploadMaxSize / 1024 / 1024
        }MB of size.`
      );

      continue;
    }

    // after read proccess done
    uploadReader.onloadend = () => {
      // before upload
      if (beforeUpload) {
        beforeUpload();
      }

      const formData = new FormData();
      formData.append('file', file);

      for (const data of extraFormData) {
        formData.append(data.key, data.value);
      }

      fetch(`${url}?kind=${kind}`, {
        method: 'post',
        body: formData,
        credentials: 'include',
        ...(userId ? { headers: { userId } } : {}),
      })
        .then((response) => {
          response[responseType]()
            .then((text) => {
              if (!response.ok) {
                return afterUpload({
                  status: 'error',
                  response,
                  fileInfo,
                });
              }

              // after upload
              if (afterUpload) {
                afterUpload({ status: 'ok', response: text, fileInfo });
              }
            })
            .catch((error) => {
              toast.error(error.message);
            });
        })
        .catch((error) => {
          toast.error(error.message);
        });
    };

    // begin read
    uploadReader.readAsArrayBuffer(file);

    // read as data url for preview purposes
    const reader = new FileReader();

    reader.onloadend = () => {
      if (afterRead) {
        afterRead({ result: reader.result, fileInfo });
      }
    };

    reader.readAsDataURL(file);
  }
};

const getVideoDuration = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader() as any;
    reader.onload = () => {
      const media = new Audio(reader.result);
      media.onloadedmetadata = () => resolve(media.duration);
    };
    reader.readAsDataURL(file);
    reader.onerror = (error) => reject(error);
  });

  export const imgSrc= 'https://xos.techstore.mn/gateway/read-file?key='