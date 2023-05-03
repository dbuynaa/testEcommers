import * as DialogPrimitive from '@radix-ui/react-dialog';
import Xmark from 'icons/Xmark';
// import Xmark from 'icons/Xmark';
import { ReactNode } from 'react';
import Button from 'ui/Button';
import c from 'clsx';

const Modal = ({
  trigger,
  children,
  contentClassName,
  ...rest
}: DialogPrimitive.DialogProps & {
  trigger?: ReactNode;
  contentClassName?: string;
}) => {
  return (
    <DialogPrimitive.Root {...rest}>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="modal-overlay" />
        <DialogPrimitive.Content
          className={c('modal-content', contentClassName)}
        >
          {children}
          <DialogPrimitive.Close asChild>
            <Button variant="slim" className="p-3 modal-close">
              <Xmark />
            </Button>
          </DialogPrimitive.Close>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default Modal;
