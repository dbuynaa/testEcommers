import Button from 'ui/Button';
import Dropdown, { DropdownItem } from 'ui/Dropdown';
import { useCurrentUser } from 'modules/appContext';
import ProfileContent from './ProfileContent';
import Link from 'next/link';
import Image from 'ui/Image';

const Profile = () => {
  const { currentUser, loadingCurrentUser } = useCurrentUser();

  if (loadingCurrentUser) return <div className="w-10"></div>;

  if (!currentUser)
    return (
      <Button
        href="/auth/login"
        variant="slim"
        className="profile-login  mx-2"
        Component={Link}
      >
        Нэвтрэх
      </Button>
    );

  return (
    <Dropdown
      trigger={
        <Button className="profile-btn mx-2" variant="ghost">
          <Image height={36} src="/images/user.png" width={36} alt="" />
        </Button>
      }
    >
      <ProfileContent ItemComponent={DropdownItem} />
    </Dropdown>
  );
};

export default Profile;
