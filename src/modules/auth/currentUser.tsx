/* eslint-disable react-hooks/exhaustive-deps */

import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { mutations, queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';
import { useEffect } from 'react';

export interface State {
  currentUser: any;
}

const CurrentUser = ({ children }: any) => {
  const { currentUser, setCurrentUser, setLoadingCurrentUser } =
    useCurrentUser();

  const router = useRouter();
  const { query } = router;
  const { from, token } = query;

  const [loginWithSocialPay] = useMutation(mutations.socialPayLogin);

  useQuery(queries.currentUser, {
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const { clientPortalCurrentUser } = data || {};
      if (!clientPortalCurrentUser && !!token) {
        loginWithSocialPay({
          variables: {
            clientPortalId: process.env.NEXT_PUBLIC_CP_ID,
            token,
          },
          onCompleted(data) {
            if (data.clientPortalLoginWithSocialPay) {
              router.push('/profile');
            }
          },
          refetchQueries: [{ query: queries.currentUser }, 'currentUser'],
        });
      }
      if (!!clientPortalCurrentUser && router.pathname?.includes('/auth')) {
        from ? router.push(from.toString()) : router.push('/');
      }
      setCurrentUser(clientPortalCurrentUser);
      setLoadingCurrentUser(false);
    },
  });

  useEffect(() => {}, [currentUser]);

  return <>{children}</>;
};

export default CurrentUser;
