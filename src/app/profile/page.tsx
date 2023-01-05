import dynamic from 'next/dynamic';
import CheckDevice from 'modules/CheckDevice';

const ProfileContent = dynamic(
  () => import('components/header/ProfileContent'),
  {
    suspense: true,
  }
);

const Profile = () => {
  return (
    <CheckDevice
      Desktop={<div />}
      Mobile={<ProfileContent ItemComponent="div" />}
    />
  );
};

export default Profile;
