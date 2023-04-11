import { useMutation } from '@apollo/client';
import Facebook from 'icons/Facebook';
import Button from 'ui/Button';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const FbLogin = () => {
  const [domain, setDomain] = useState('');

  useEffect(() => {
    const currentDomain = window.location.hostname;
    setDomain(currentDomain);
  }, []);

  const getGoogleUrl = (from) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const options = {
      redirect_uri: `${domain}/auth/login`,
      client_id:
        '72981302453-gk1aq46nlhaen1b4q14f2hbe6tsugq0s.apps.googleusercontent.com',
      access_type: 'offline',
      response_type: 'code',
      prompt: 'consent',
      scope: [
        'https://www.googleapis.com/auth/userinfo.profile',
        'https://www.googleapis.com/auth/userinfo.email',
      ].join(' '),
      state: from,
    };

    const qs = new URLSearchParams(options);

    return `${rootUrl}?${qs.toString()}`;
  };

  const [login, { loading }] = useMutation(mutations.fbLogin, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
    onError(error) {
      return toast.error(error.message);
    },
  });

  const handleClick = () =>
    login({
      variables: {
        clientPortalId: process.env.NEXT_PUBLIC_CP_ID,
      },
    });

  return (
    <Button
      className="google-btn flex items-center"
      onClick={handleClick}
      loading={loading}
      Component={Link}
      href={getGoogleUrl('/auth/login')}
    >
      Googleeer newtreh
    </Button>
  );
};

export default FbLogin;
