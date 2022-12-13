'use client';

import User from 'icons/User';
import Button from 'ui/Button';
import Dropdown from 'ui/Dropdown';
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
      </Button>
    );

  return (
    <Dropdown
      trigger={
        <Button className="profile-btn" variant="ghost">
          <User />
        </Button>
      }
    >
      <ProfileContent />
    </Dropdown>
  );
};

export default Profile;
