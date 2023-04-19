import { useRouter } from 'next/router';
import { useMutation } from '@apollo/client';
import Facebook from 'icons/Facebook';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';
import FacebookLogin from 'react-facebook-login';

const FbLogin = () => {
  const router = useRouter();
  const { from } = router.query;
  const [login, { loading }] = useMutation(mutations.fbLogin, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
    onError(error) {
      return toast.error(error.message);
    },
  });

  const responseFacebook = (response) => {
    const { accessToken } = response;
    console.log(accessToken, 'haha');
    if (accessToken) {
      login({
        variables: {
          clientPortalId: process.env.NEXT_PUBLIC_CP_ID,
          accessToken,
        },
        onCompleted() {
          router.push((from || '/') + '');
        },
      });
    }
  };

  return (
    <FacebookLogin
      icon={<Facebook />}
      appId={'2166997233507546'}
      callback={responseFacebook}
      className="btn flat"
      textButton="Facebook - ээр нэвтрэх"
    />
    // <Button
    //   className="fb-btn flex items-center"
    //   onClick={handleClick}
    //   loading={loading}
    // >
    //   <Facebook className="me-1" /> Facebook - ээр нэвтрэх
    // </Button>
  );
};

export default FbLogin;
