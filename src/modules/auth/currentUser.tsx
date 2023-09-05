/* eslint-disable react-hooks/exhaustive-deps */

import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { mutations, queries } from './graphql';
import { useCurrentUser } from 'modules/appContext';
import { setLocal } from 'utils';

export interface State {
  currentUser: any;
}

const CurrentUser = ({ children }: any) => {
  const { setCurrentUser, setLoadingCurrentUser } = useCurrentUser();

  const router = useRouter();
  const { query } = router;
  const { from, token } = query;

  const [loginWithSocialPay] = useMutation(mutations.socialPayLogin, {
    onCompleted() {
      setLocal('socialPayToken', token);
    },
  });

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

  return <>{children}</>;
};

export default CurrentUser;
