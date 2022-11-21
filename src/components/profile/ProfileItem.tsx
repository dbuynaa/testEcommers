'use client';

import { DropdownItem } from 'ui/Dropdown';
import { useRouter } from 'next/navigation';

const ProfileItem = ({ href, children, icon }: any) => {
  const router = useRouter();

  return (
    <DropdownItem
      className="profile-item text-mid-gray flex w-100 items-center p-2"
      onClick={() => router.push(href)}
    >
      <span>{icon}</span>
      {children}
    </DropdownItem>
  );
};

export default ProfileItem;
