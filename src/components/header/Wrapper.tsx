'use client';
import type { ReactNode } from 'react';
import clsx from 'clsx';
import useScrollDirection from 'lib/useScrollDirection';

const ScrollWrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) => {
  const direction = useScrollDirection();

  return <div className={clsx(className, direction)}>{children}</div>;
};

export default ScrollWrapper;
