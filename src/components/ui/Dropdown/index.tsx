

import type { ReactNode } from 'react';
import clsx from 'clsx';

import {
  Root,
  Trigger,
  Portal,
  Content,
  Arrow,
  Item,
  DropdownMenuProps,
} from '@radix-ui/react-dropdown-menu';

export const DropdownItem = Item;

const Dropdown = ({
  trigger,
  children,
  className,
  ...rest
}: DropdownMenuProps & { trigger: ReactNode; className?: string }) => {
  return (
    <Root {...rest}>
      <Trigger asChild className="dropdown-trigger">
        {trigger}
      </Trigger>
      <Portal>
        <Content className={clsx('dropdown-content', className)}>
          {children}
          <Arrow className="dropdown-arrow" />
        </Content>
      </Portal>
    </Root>
  );
};

export default Dropdown;
