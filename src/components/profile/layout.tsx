import PrivateRoute from 'modules/auth/privateRoute';
import dynamic from 'next/dynamic';
import CheckDevice from 'modules/CheckDevice';

const ProfileContent = dynamic(
  () => import('components/header/ProfileContent'),
  {
    suspense: true,
  }
);

const Layout = ({ children }: any) => {
  return (
    <PrivateRoute>
      <div className="container py-3 py-md-5 profile">
        <div className="row">
          <div className="col-0 col-md-3 pe-md-4">
            <CheckDevice Desktop={<ProfileContent ItemComponent="div" />} />
          </div>
          <div className="col-12 col-md-9">{children}</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
