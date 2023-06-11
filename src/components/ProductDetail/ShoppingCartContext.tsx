// import { useContext, createContext, useState } from 'react';
// import { useLocalStorage } from '../ProductDetail/CartUseLocalStorage';
// import { toast } from 'react-toastify';
// type CartItem = {
//   _id: string;
//   quantity: number;
//   name: string;
//   unitPrice: string;
//   attachment?: any;
// };

// type ShoppingCartContextProps = {
//   openCart: () => void;
//   closeCart: () => void;
//   getItemQuantity: (id: string) => number;
//   increaseCartQuantity: ({}: CartItem) => void;
//   decreaseCartQuantity: (id: string) => void;
//   removeCartItem: (id: string) => void;
//   cartItems: CartItem[];
//   cartQuantity: number;
// };

// const ShoppingCartContext = createContext({} as ShoppingCartContextProps);

// export function useShoppingCart() {
//   return useContext(ShoppingCartContext);
// }

// export function ShoppingCartProvider({ children }) {
//   //   const [cartItems, setCartItems] = useState<CartItem[]>([]);
//   const [cartItems, setCartItems] = useLocalStorage<CartItem[]>('shopping-cart', []);
//   const [isOpen, setIsOpen] = useState(false);

//   const cartQuantity = cartItems.reduce((quantity, item) => quantity + item.quantity, 0);
//   const openCart = () => setIsOpen(true);
//   const closeCart = () => setIsOpen(false);

//   const getItemQuantity = (id: string) => {
//     const item = cartItems.find((item) => item._id === id);
//     return item ? item.quantity : 0;
//   };

//   const increaseCartQuantity = ({ _id, name, quantity, unitPrice, attachment }: CartItem) => {
//     toast.success('Барааг сагсанд нэмлээ.', {
//       position: toast.POSITION.TOP_CENTER,
//     });
//     setCartItems((currentItems) => {
//       if (currentItems.find((item) => item._id === _id) == null) {
//         return [...currentItems, { _id, quantity: 1, name, unitPrice, attachment }];
//       } else {
//         return currentItems.map((item) => {
//           if (item._id === _id) {
//             return { ...item, quantity: item.quantity + 1, name: item.name, unitPrice: item.unitPrice, image: item.attachment?.url };
//           } else {
//             return item;
//           }
//         });
//       }
//     });
//   };

//   const decreaseCartQuantity = (_id: string) => {
//     setCartItems((currentItems) => {
//       if (currentItems.find((item) => item._id === _id)?.quantity === 1) {
//         return currentItems.filter((item) => item._id !== _id);
//       } else {
//         return currentItems.map((item) => {
//           if (item._id === _id) {
//             return { ...item, quantity: item.quantity - 1 };
//           } else {
//             return item;
//           }
//         });
//       }
//     });
//   };

//   const removeCartItem = (_id: string) => {
//     setCartItems((currentItems) => currentItems.filter((item) => item._id !== _id));
//   };

//   return (
//     <ShoppingCartContext.Provider
//       value={{ getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeCartItem, cartItems, cartQuantity, openCart, closeCart }}
//     >
//       {children}
//       {/* <CartDropdown /> */}
//     </ShoppingCartContext.Provider>
//   );
// }
