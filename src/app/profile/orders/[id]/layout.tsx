import ArrowLeft from 'icons/ArrowLeft';
import Button from 'ui/Button';
import Link from 'next/link';
import type { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="order-detail">
      <Button
        variant="ghost"
        Component={Link}
        className="profile-back"
        riffle={false}
        href="/profile/orders"
      >
        <ArrowLeft className="me-3" />
        Миний захиалгууд
      </Button>
      <div className="p-5 -main my-3 rounded">
        <h5 className="text-blue hr pb-3">Захиалгын мэдээлэл</h5>
        {children}
      </div>
    </div>
  );
};

export default Layout;
