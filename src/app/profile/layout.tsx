import PrivateRoute from 'modules/auth/privateRoute';
import ProfileContent from 'components/header/ProfileContent';

const Layout = ({ children }: any) => {
  return (
    <PrivateRoute>
      <div className="container py-5 profile">
        <div className="row px-3">
          <div className="col-3 pe-4">
            <ProfileContent ItemComponent="div" />
          </div>
          <div className="col-9">{children}</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Layout;
