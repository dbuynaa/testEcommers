import Button from 'ui/Button';
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
      client_id: process.env.NEXT_PUBLIC_GOOGLE_ID || '',
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
