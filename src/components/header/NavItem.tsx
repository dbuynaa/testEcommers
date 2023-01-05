'use client';

import { usePathname } from 'next/navigation';
import Button from 'ui/Button';
import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

const NavItem = ({
  text,
  href,
  icon,
}: {
  text: string;
  href: string;
  icon: ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <Button
      Component={Link}
      href={href}
      variant="ghost"
      className={clsx('navbar-item', pathname === href && '-active')}
    >
      <div>
        {icon}
        <small className="block">{text}</small>
      </div>
    </Button>
  );
};

export default NavItem;
