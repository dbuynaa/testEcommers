'use client';
import { useMutation } from '@apollo/client';
import Button from 'ui/Button';
import { useRouter } from 'next/navigation';
import { mutations, queries } from './graphql';
import LogoutIcon from 'icons/Logout';

const Logout = () => {
  const router = useRouter();
  const [userLogout, { loading }] = useMutation(mutations.logout, {
    onCompleted() {
      router.refresh();
    },
    refetchQueries: [{ query: queries.currentUser }, 'clientPortalCurrentUser'],
  });
  return (
    <div>
      <Button
        variant="ghost"
        className="profile-item text-mid-gray flex w-100 items-center p-2 justify-start"
        loading={loading}
        onClick={() => userLogout()}
      >
        <span>
          <LogoutIcon />
        </span>
        Гарах
      </Button>
    </div>
  );
};

export default Logout;
