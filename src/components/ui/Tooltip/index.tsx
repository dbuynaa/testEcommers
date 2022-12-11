import {
  Provider,
  Root,
  Trigger,
  Portal,
  Content,
  Arrow,
} from '@radix-ui/react-tooltip';
import type { ReactNode } from 'react';

const Tooltip = ({ children, text }: { children: ReactNode; text: string }) => {
  return (
    <Provider>
      <Root>
        <Trigger asChild>{children}</Trigger>
        <Portal>
          <Content sideOffset={5} className="tooltip-content">
            {text}
            <Arrow className="tooltip-arrow" />
          </Content>
        </Portal>
      </Root>
    </Provider>
  );
};

export default Tooltip;
