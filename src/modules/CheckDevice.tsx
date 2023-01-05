'use client';
import useWindowSize from 'lib/useWindowSize';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import Loading from 'ui/Loading';

const CheckDevice = ({
  Mobile = null,
  Desktop = null,
}: {
  Mobile?: ReactNode;
  Desktop?: ReactNode;
}) => {
  const windowSize = useWindowSize();

  return (
    <Suspense fallback={<Loading />}>
      {(windowSize.width || 0) <= 768 ? Mobile : Desktop}
    </Suspense>
  );
};

export default CheckDevice;
