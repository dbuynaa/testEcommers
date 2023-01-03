import Logo from 'icons/logo';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Top from './top';
import { Fragment, memo } from 'react';
// import Notification from './Notification';
import Cart from './Cart';
import Profile from './Profile';
import CheckDevice from 'modules/CheckDevice';

const Nav = dynamic(() => import('./Nav'), {
  suspense: true,
});
const MainCategories = dynamic(
  () => import('modules/Products/MainCategories'),
  {
    suspense: true,
  }
);

const Search = dynamic(() => import('./Search'), {
  suspense: true,
});

const Header = () => {
  return (
    <header>
      <div className="container pt-1">
        {/* <Top /> */}
        <div className="flex py-3 justify-between">
          <div className="">
            <div className="flex items-center">
              <Link href="/">
                <Logo className="logo" />
              </Link>
              <CheckDevice Desktop={<Search />} Mobile={null} />
              <CheckDevice Desktop={<Nav />} Mobile={null} />
            </div>
          </div>
          <div className="flex items-center">
            {/* <Notification /> */}
            <Cart />
            <Profile />
          </div>
        </div>
        <CheckDevice Desktop={<MainCategories />} Mobile={null} />
      </div>
    </header>
  );
};

export default memo(Header);
