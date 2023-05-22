
import useWindowSize from 'lib/useWindowSize';
import type { ReactNode } from 'react';
import { Suspense } from 'react';
import Loading from 'ui/Loading';

const CheckDevice = ({
  Mobile = null,
  Desktop = null,
  fallBack = <Loading />,
}: {
  Mobile?: ReactNode;
  Desktop?: ReactNode;
  fallBack?: ReactNode;
}) => {
  const { width } = useWindowSize();

  return (
    <Suspense fallback={fallBack}>
      {!!width && width <= 999 && Mobile }
      {!!width && width >= 999 && Desktop}
    </Suspense>
  );
};

export default CheckDevice;
