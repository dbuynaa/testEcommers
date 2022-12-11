'use client';
import { useMutation, useQuery } from '@apollo/client';
import Loading from 'ui/Loading';
import { queries } from './graphql';
import { useCurrentUser, useLoadingCurrentUser } from 'modules/appContext';

export interface State {
  currentUser: any;
}

const CurrentUser = ({ children }: any) => {
  const { setCurrentUser } = useCurrentUser();
  const { setLoadingCurrentUser } = useLoadingCurrentUser();

  useQuery(queries.currentUser, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const { clientPortalCurrentUser } = data || {};
      setCurrentUser(clientPortalCurrentUser);
      setLoadingCurrentUser(false);
    },
  });

  return <>{children}</>;
};

export default CurrentUser;
