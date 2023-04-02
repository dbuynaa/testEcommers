
import { useMutation } from '@apollo/client';
import Button from 'ui/Button';
import { mutations, queries } from './graphql';
import LogoutIcon from 'icons/Logout';

const Logout = ({ Component }: any) => {
  const [userLogout, { loading }] = useMutation(mutations.logout, {
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
  });

  return (
    <Component asChild>
      <Button
        variant="ghost"
        className="profile-item text-mid-gray flex w-100 items-center p-2 justify-start text-regular"
        loading={loading}
        onClick={() => userLogout()}
      >
        <span>
          <LogoutIcon />
        </span>
        Гарах
      </Button>
    </Component>
  );
};

export default Logout;
