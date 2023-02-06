/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { ReactNode, useEffect } from 'react';
import { useCurrentUser, useLoadingCurrentUser } from 'modules/appContext';
import Loading from 'ui/Loading';
import { useRouter, usePathname } from 'next/navigation';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useCurrentUser();
  const { loadingCurrentUser } = useLoadingCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loadingCurrentUser && !currentUser) {
      router.push(`/auth/login?from=${pathname}`);
    }
  }, [currentUser, loadingCurrentUser]);

  if (!currentUser) return <Loading className="min-height-screen" />;

  return <>{children}</>;
};

export default PrivateRoute;
