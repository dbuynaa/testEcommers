import { useMutation } from '@apollo/client';
import Facebook from 'icons/Facebook';
import Button from 'ui/Button';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Google from 'icons/Google';

const FbLogin = () => {
  const [domain, setDomain] = useState('');

  useEffect(() => {
    const currentDomain = window.location.hostname;
    setDomain(currentDomain);
  }, []);

  const getGoogleUrl = (from) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const options = {
      redirect_uri: `https://tech-store-13.vercel.app/auth/login`,
      client_id:
        '1057893484797-gkbmo1kp4nuk7r3a997c03bb80b6ibqs.apps.googleusercontent.com',
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
      variant="slim"
    >
      <Google className="mr-2" />
      Google - ээр нэвтрэх
    </Button>
  );
};

export default FbLogin;
