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
          <Link href="/profile/info" prefetch={false}>
            Хувийн мэдээлэл
          </Link>
        </TabTrigger>
        <TabTrigger value="/profile/info/change-password">
          <Link href="/profile/info/change-password" prefetch={false}>
            Нууц үг өөрчлөх
          </Link>
        </TabTrigger>
      </TabsList>
      {children}
    </Tabs>
  );
};

export default Layout;
