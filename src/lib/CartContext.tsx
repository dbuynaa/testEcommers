import React, { useContext, createContext, useState } from 'react';
const DialogContext = createContext({} as any);

export const CartProvider = ({ children }) => {
  const [showDialog, setShowDialog] = useState(false);

  const openDialog = () => {
    setShowDialog((prev) => !prev);
  };

  const closeDialog = () => {
    setShowDialog(false);
  };

  return <DialogContext.Provider value={{ showDialog, openDialog, closeDialog }}>{children}</DialogContext.Provider>;
};

export const useDialog = () => {
  return useContext(DialogContext);
};
