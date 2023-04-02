/* eslint-disable react-hooks/exhaustive-deps */

import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';
import { useEffect } from 'react';

export interface State {
  currentUser: any;
}

const CurrentUser = ({ children }: any) => {
  const { currentUser, setCurrentUser, setLoadingCurrentUser } =
    useCurrentUser();

  const router = useRouter();
  const { pathname, query } = router;
  const { from } = query;

  useQuery(queries.currentUser, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const { clientPortalCurrentUser } = data || {};
      setCurrentUser(clientPortalCurrentUser);
      setLoadingCurrentUser(false);
    },
  });

  useEffect(() => {
    if (currentUser && router.pathname?.includes('/auth')) {
      from ? router.push(from + ' ') : router.push('/');
    }
  }, [currentUser]);

  if (currentUser && pathname?.includes('/auth')) {
    return null;
  }

  return <>{children}</>;
};

export default CurrentUser;
