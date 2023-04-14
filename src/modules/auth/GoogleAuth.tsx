import { useMutation } from '@apollo/client';
import Facebook from 'icons/Facebook';
import Button from 'ui/Button';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Google from 'icons/Google';

const GoogleLogin = () => {
  const [domain, setDomain] = useState('');

  useEffect(() => {
    const currentDomain = window.location.hostname;
    setDomain(currentDomain);
  }, []);

  const getGoogleUrl = (from) => {
    const rootUrl = `https://accounts.google.com/o/oauth2/v2/auth`;
    const options = {
      redirect_uri: `https://${domain}/auth/verifyGoogle`,
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

  return (
    <Button
      className="google-btn flex items-center"
      Component={Link}
      href={getGoogleUrl('/auth/login')}
      variant="slim"
    >
      <Google className="mr-2" />
      Google - ээр нэвтрэх
    </Button>
  );
};

export default GoogleLogin;
