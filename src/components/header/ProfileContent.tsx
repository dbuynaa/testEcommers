import MainInfo from 'components/profile/mainInfo';
import ProfileItem from 'components/profile/ProfileItem';
import { DropdownItem } from 'ui/Dropdown';
import Bags from 'icons/Bags';
import Stars from 'icons/Stars';
import AddressCard from 'icons/AddressCard';
import CircleHeart from 'icons/CircleHeart';
import Logout from 'modules/auth/logout';
import Heart from 'icons/Heart';

const ProfileContent = ({ ItemComponent }: any) => {
  return (
    <>
      <MainInfo />
      <div className="hr my-2" />
      <ProfileItem
        href="/profile/info"
        icon={<AddressCard />}
        Component={ItemComponent}
      >
        Хувийн мэдээлэл
      </ProfileItem>
      {/* <ProfileItem href="/profile/loyalty" icon={<Stars />}>
        Урамшуулал
      </ProfileItem> */}
      <ProfileItem
        href="/profile/orders"
        icon={<Bags />}
        Component={ItemComponent}
      >
        Миний захиалгууд
      </ProfileItem>

      <ProfileItem
        href="/profile/wishlist"
        icon={<Heart regular />}
        Component={ItemComponent}
      >
        Хүслийн жагсаалт
      </ProfileItem>

      {/* <ProfileItem href="/profile/wishlist" icon={<CircleHeart />}>
        Хүслийн жагсаалт
      </ProfileItem> */}
      <Logout Component={ItemComponent} />
    </>
  );
};

export default ProfileContent;
