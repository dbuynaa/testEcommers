import Logo from 'icons/logo';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Cart from './Cart';
import CheckDevice from 'modules/CheckDevice';
import ScrollWrapper from './Wrapper';
import MainCategories from 'modules/Products/MainCategories';
import Nav from './Nav';
import Search from './Search';
import Profile from './Profile';

const Header = () => {
  return (
    <ScrollWrapper className="header scroll ">
      <header>
        <div className="px-3 px-md-4 pt-1">
          <div className="flex py-3 justify-between">
            <div className="col-md-7">
              <div className="flex items-center">
                <Link href="/">
                  <Logo className="logo" />
                </Link>
                <Search inHead />
                <Nav />
              </div>
            </div>
            <div className="flex items-center">
              <Cart />
              <Profile />
            </div>
          </div>
          <CheckDevice Desktop={<MainCategories />} Mobile={null} />
        </div>
      </header>
    </ScrollWrapper>
  );
};

export default Header;
