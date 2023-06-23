import ProfileItem from 'components/profile/ProfileItem';
import Bags from 'icons/Bags';
import AddressCard from 'icons/AddressCard';
import Logout from 'modules/auth/logout';
import Heart from 'icons/Heart';
import Avatar from './Avatar';

// import AvatarEdit from 'modules/auth/Avatar';

const ProfileContent = ({ ItemComponent }: any) => {
  return (
    <>
      <div>
        <Avatar/>
      </div>
      <div>
   
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
      </div>
    </>
  );
};

export default ProfileContent;
