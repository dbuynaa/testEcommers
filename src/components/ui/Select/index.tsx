'use client';
import {
  Portal,
  Root,
  Trigger,
  Value,
  Content,
  ScrollUpButton,
  Viewport,
  Item,
  SelectItemProps,
  ScrollDownButton,
  Group,
  SelectIcon,
  ItemText,
  ItemIndicator,
  SelectProps,
} from '@radix-ui/react-select';
import ChevronUp from 'icons/ChevronUp';
import Check from 'icons/Check';
import type { ReactNode } from 'react';

interface IProps {
  placeholder?: string;
  children: ReactNode;
}

export const SelectItem = ({ value, children }: SelectItemProps) => {
  return (
    <Item className="select-item" value={value}>
      <ItemText>{children}</ItemText>
      <ItemIndicator className="select-item-indicator">
        <Check />
      </ItemIndicator>
    </Item>
  );
};

const Select = ({ placeholder, children, ...rest }: IProps & SelectProps) => {
  return (
    <div>
      <Root {...rest}>
        <Trigger className="select-trigger" aria-label="Food">
          <Value placeholder={placeholder} />
          <SelectIcon className="select-icon">
            <ChevronUp degree={180} />
          </SelectIcon>
        </Trigger>
        <Portal>
          <Content className="select-content">
            <ScrollUpButton className="select-btn">
              <ChevronUp />
            </ScrollUpButton>
            <Viewport className="p-1">
              <Group>{children}</Group>
            </Viewport>
            <ScrollDownButton className="select-btn">
              <ChevronUp degree={180} />
            </ScrollDownButton>
          </Content>
        </Portal>
      </Root>
    </div>
  );
};

export default Select;
