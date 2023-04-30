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
    <Link
      href={href}
      className={clsx('navbar-item btn ghost', pathname === href && '-active')}
    >
      {icon}
      <small className="block">{text}</small>
    </Link>
  );
};

export default NavItem;
