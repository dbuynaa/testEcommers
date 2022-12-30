'use client';

import { useRouter } from 'next/navigation';

const ProfileItem = ({ href, children, icon, Component }: any) => {
  const router = useRouter();

  return (
    <Component
      className="profile-item text-mid-gray flex w-100 items-center p-2"
      onClick={() => router.push(href)}
    >
      <span>{icon}</span>
      {children}
    </Component>
  );
};

export default ProfileItem;
