/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useQuery } from '@apollo/client';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';
import { useEffect } from 'react';

export interface State {
  currentUser: any;
}

const CurrentUser = ({ children }: any) => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const from = searchParams.get('from');

  const router = useRouter();

  const { loading } = useQuery(queries.currentUser, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const { clientPortalCurrentUser } = data || {};
      setCurrentUser(clientPortalCurrentUser);
    },
  });

  useEffect(() => {
    if (currentUser && pathname?.includes('/auth')) {
      from ? router.push(from) : router.push('/');
    }
  }, [currentUser]);

  if (currentUser && pathname?.includes('/auth')) {
    return null;
  }

  return <>{children}</>;
};

export default CurrentUser;
