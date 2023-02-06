import Logo from 'icons/logo';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Cart from './Cart';
import CheckDevice from 'modules/CheckDevice';
import ScrollWrapper from './Wrapper';
import Nav from './Nav';
import Search from './Search';
import Profile from './Profile';

const MainCategories = dynamic(
  () => import('modules/Products/MainCategories'),
  { suspense: true }
);

const Header = () => {
  return (
    <ScrollWrapper className="header scroll ">
      <header>
        <div className="flex py-2 py-md-3 px-3 px-md-4  justify-between items-center">
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
        <div className="flex items-center product-cats hover-scroll -x px-3 px-md-4"></div>
        {/* <CheckDevice
          Desktop={<MainCategories />}
          Mobile={null}
          fallBack={
            <div className="flex items-center product-cats hover-scroll -x px-3 px-md-4"></div>
          }
        /> */}
      </header>
    </ScrollWrapper>
  );
};

export default Header;
