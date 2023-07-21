import Layout from 'components/auth/layout';
import { getLogin } from 'lib/wp/page';
import type { GetStaticPaths, GetStaticProps } from 'next';
import { Suspense } from 'react';
import Loading from 'ui/Loading';
import dynamic from 'next/dynamic';

const Login = dynamic(() => import('modules/auth/Login'), {
  suspense: true,
});

const ForgotPassword = dynamic(() => import('modules/auth/forgotPassword'), {
  suspense: true,
});

const Register = dynamic(() => import('modules/auth/register'), {
  suspense: true,
});

const VerifyGoogle = dynamic(() => import('modules/auth/verifyGoogle'), {
  suspense: true,
});

const Auth = ({ image, type }: { image?: string; type: string }) => {
  return (
    <Layout image={image}>
      <Suspense fallback={<Loading />}>
        {type === 'login' && <Login />}
        {type === 'forgot-password' && <ForgotPassword />}
        {type === 'register' && <Register />}
        {type === 'verifyGoogle' && <VerifyGoogle />}
      </Suspense>
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { page } = await getLogin();
  return {
    props: {
      image: page?.featuredImage?.sourceUrl || '',
      type: (params || {}).type,
    },
    revalidate: 60,
  };  
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { type: 'login' } },
      { params: { type: 'register' } },
      { params: { type: 'forgot-password' } },
      { params: { type: 'verifyGoogle' } },
    ],
    fallback: false,
  };
};

export default Auth;
