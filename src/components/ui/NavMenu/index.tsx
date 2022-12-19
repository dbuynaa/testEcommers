'use client';
import {
  Root,
  List,
  Item,
  Trigger,
  Content,
  Link,
  Viewport,
  NavigationMenuProps,
  Indicator,
} from '@radix-ui/react-navigation-menu';
import clsx from 'clsx';

const NavMenu = ({ className, children, ...rest }: NavigationMenuProps) => {
  return (
    <Root className={clsx('navmenu', className)} {...rest}>
      <List>
        {children}
        <Indicator>
          <div className="arrow"></div>
        </Indicator>
      </List>
      <div className="-viewport-position">
        <Viewport className="-viewport" />
      </div>
    </Root>
  );
};

export { Item, Trigger, Content, Link };

export default NavMenu;
