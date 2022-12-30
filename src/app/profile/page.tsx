import { TabsContent } from 'components/ProductDetail/Tabs';
import { usePathname } from 'next/navigation';

const Profile = () => {
  const pathname = usePathname();
  return <TabsContent value={pathname || ''}>Profile</TabsContent>;
};

export default Profile;
