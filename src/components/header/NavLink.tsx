

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const NavLink = ({ children, href, className, ...rest }: any) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={clsx(className, { '-active': href === pathname })}
      {...rest}
    >
      {children}
    </Link>
  );
};

export default NavLink;
