'use client';
import { ReactNode, useEffect } from 'react';
import { useCurrentUser, useLoadingCurrentUser } from 'modules/appContext';
import Loading from 'ui/Loading';
import { useRouter, usePathname } from 'next/navigation';

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useCurrentUser();
  const { loading: loadingUser } = useLoadingCurrentUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loadingUser && !currentUser) {
      router.push(`/auth/login?from=${pathname}`);
    }
  }, [loadingUser]);

  if (!currentUser || loadingUser) return <Loading />;

  return <>{children}</>;
};

export default PrivateRoute;
