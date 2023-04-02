

import User from 'icons/User';
import Button from 'ui/Button';
import Dropdown, { DropdownItem } from 'ui/Dropdown';
import { useCurrentUser } from 'modules/appContext';
import ProfileContent from './ProfileContent';
import Link from 'next/link';

const Profile = () => {
  const { currentUser } = useCurrentUser();

  if (!currentUser)
    return (
      <Button
        href="/auth/login"
        className="profile-btn"
        variant="ghost"
        Component={Link}
      >
        <User />
        <small className="block">Нэвтрэх</small>
      </Button>
    );

  return (
    <Dropdown
      trigger={
        <Button className="profile-btn" variant="ghost">
          <User />
          <small className="block">Профайл</small>
        </Button>
      }
    >
      <ProfileContent ItemComponent={DropdownItem} />
    </Dropdown>
  );
};

export default Profile;
