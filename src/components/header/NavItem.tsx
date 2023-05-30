import { useRouter } from 'next/router';
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
  const router = useRouter();

  return (
    <Link
      href={href}
      className={clsx(
        'navbar-item btn ghost',
        router.asPath.includes(href) && '-active'
      )}
    >
      {icon}
      <small className="block">{text}</small>
    </Link>
  );
};

export default NavItem;
