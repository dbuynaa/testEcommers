import MainInfo from 'components/profile/mainInfo';
import ProfileItem from 'components/profile/ProfileItem';
import Bags from 'icons/Bags';
import Stars from 'icons/Stars';
import AddressCard from 'icons/AddressCard';
import CircleHeart from 'icons/CircleHeart';

const ProfileContent = () => {
  return (
    <>
      <MainInfo />
      <div className="hr my-2" />
      <ProfileItem href="/profile" icon={<AddressCard />}>
        Хувийн мэдээлэл
      </ProfileItem>
      <ProfileItem href="/profile/loyalty" icon={<Stars />}>
        Урамшуулал
      </ProfileItem>
      <ProfileItem href="/profile/orders" icon={<Bags />}>
        Миний захиалгууд
      </ProfileItem>
      <ProfileItem href="/profile/wishlist" icon={<CircleHeart />}>
        Хүслийн жагсаалт
      </ProfileItem>
    </>
  );
};

export default ProfileContent;
