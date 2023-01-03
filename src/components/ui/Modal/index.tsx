'use client';
import * as DialogPrimitive from '@radix-ui/react-dialog';
// import Xmark from 'icons/Xmark';
import { ReactNode } from 'react';

const Modal = ({
  trigger,
  children,
  ...rest
}: DialogPrimitive.DialogProps & { trigger: ReactNode }) => {
  return (
    <DialogPrimitive.Root {...rest}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="modal-overlay" />
        <DialogPrimitive.Content className="modal-content">
          {children}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Modal;
