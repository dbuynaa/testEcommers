import { useMutation } from '@apollo/client';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Loading from 'ui/Loading';

const VerifyGoogle = () => {
  const router = useRouter();
  const { code } = router.query;

  const [login, { loading }] = useMutation(mutations.googleLogin, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
    onError(error) {
      return toast.error(error.message);
    },
  });

  useEffect(() => {
    code &&
      login({
        variables: {
          code,
          clientPortalId: process.env.NEXT_PUBLIC_CP_ID,
        },
      })
        .then((result) => {
          if (result?.data?.clientPortalGoogleAuthentication === 'loggedin') {
            router.push('/');
          }
        })
        .catch((e) => {
          console.error('error: ', e.message);
        });
  }, [code, login, router]);

  return <Loading />;
};

export default VerifyGoogle;
