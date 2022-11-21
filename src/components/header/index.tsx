import Logo from 'icons/logo';
import Link from 'next/link';
import Top from './top';
import { memo } from 'react';
import Search from './Search';
import Nav from './Nav';
import Notification from './Notification';
import Cart from './Cart';
import Profile from './Profile';
import MainCategories from 'modules/Products/MainCategories';

const Header = () => {
  return (
    <header>
      <div className="container pt-1">
        <Top />
        <div className="flex py-3 justify-between">
          <div className="col-10">
            <div className="flex items-center">
              <Link href="/">
                <Logo className="logo" />
              </Link>
              <Search />
              <Nav />
            </div>
          </div>
          <div className="flex items-center">
            {/* <Notification /> */}
            <Cart />
            <Profile />
          </div>
        </div>
        <MainCategories />
      </div>
    </header>
  );
};

export default memo(Header);
