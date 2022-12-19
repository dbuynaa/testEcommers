import type { ReactNode } from 'react';
import {
  Root,
  Trigger,
  Portal,
  Content,
  PopoverProps,
} from '@radix-ui/react-popover';

const Popover = ({
  trigger,
  children,
  className,
  ...rest
}: PopoverProps & { trigger?: ReactNode; className?: string }) => {
  return (
    <Root {...rest}>
      <Trigger asChild>{trigger}</Trigger>
      <Portal>
        <Content className="popo-content" align="start">
          {children}
        </Content>
      </Portal>
    </Root>
  );
};

export default Popover;
