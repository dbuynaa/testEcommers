'use client';
import useWindowSize from 'lib/useWindowSize';
import type { ReactNode } from 'react';

const CheckDevice = ({
  Mobile,
  Desktop,
  ...rest
}: {
  Mobile: ReactNode;
  Desktop: ReactNode;
} & any) => {
  const windowSize = useWindowSize();

  console.log(windowSize);

  if ((windowSize.width || 0) <= 998) return Mobile;

  return Desktop;
};

export default CheckDevice;
