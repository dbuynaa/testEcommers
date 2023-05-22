import { useRouter } from 'next/router';
import clsx from 'clsx';

const ProfileItem = ({ href, children, icon, Component }: any) => {
  const router = useRouter();

  return (
    <Component
      className={clsx(
        'profile-item text-mid-gray flex w-100 items-center p-2',
        router.pathname.includes(href) && '-active'
      )}
      onClick={() => router.push(href)}
    >
      <span>{icon}</span>
      {children}
    </Component>
  );
};

export default ProfileItem;
