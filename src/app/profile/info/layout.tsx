'use client';
import Tabs, { TabsList, TabTrigger } from 'components/ProductDetail/Tabs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Layout = ({ children }: any) => {
  const pathname = usePathname();
  return (
    <Tabs value={pathname || ''}>
      <TabsList>
        <TabTrigger value="/profile/info">
          <Link href="/profile/info">Хувийн мэдээлэл</Link>
        </TabTrigger>
        <TabTrigger value="/profile/info/change-password">
          <Link href="/profile/info/change-password">Нууц үг өөрчлөх</Link>
        </TabTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default Layout;
