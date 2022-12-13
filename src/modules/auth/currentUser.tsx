'use client';
import { useMutation, useQuery } from '@apollo/client';
import Loading from 'ui/Loading';
import { queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';

export interface State {
  currentUser: any;
}

const CurrentUser = ({ children }: any) => {
  const { setCurrentUser } = useCurrentUser();

  const { loading } = useQuery(queries.currentUser, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const { clientPortalCurrentUser } = data || {};
      setCurrentUser(clientPortalCurrentUser);
    },
  });

  if (loading) return <></>;
  return <>{children}</>;
};

export default CurrentUser;
