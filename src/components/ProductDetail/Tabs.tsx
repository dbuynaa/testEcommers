'use client';

import {
  Root,
  List,
  Trigger,
  Content,
  TabsTriggerProps,
  TabsListProps,
  TabsContentProps,
  TabsProps,
} from '@radix-ui/react-tabs';
import Button from 'ui/Button';
import clsx from 'clsx';

export const TabTrigger = ({
  children,
  className,
  ...props
}: TabsTriggerProps) => (
  <Trigger {...props} asChild className={clsx('tabs-trigger')}>
    <Button variant="ghost" riffle={false}>
      {children}
    </Button>
  </Trigger>
);

export const TabsContent = ({ className, ...props }: TabsContentProps) => (
  <Content {...props} className={clsx('tabs-list', className)} />
);

export const TabsList = ({ className, ...props }: TabsListProps) => (
  <List {...props} className={clsx('tabs-list', className)} />
);

const Tabs = ({ className, ...props }: TabsProps) => {
  return <Root className={clsx('flex flex-col', className)} {...props} />;
};

export default Tabs;
