import Logo from 'icons/logo';
import Link from 'next/link';
import Cart from './Cart';
import ScrollWrapper from './Wrapper';
import Nav from './Nav';
import Search from './Search';
import MainCategories from 'modules/Products/MainCategories';
import Profile from './Profile';

const Header = ({ mainCategories }: any) => {
  return (
    <ScrollWrapper className="header scroll ">
      <header>
        <div className="flex py-2 py-md-3 px-3 px-md-4  justify-between items-center">
          <div className="col-md-9">
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
        <MainCategories mainCategories={mainCategories} />
      </header>
    </ScrollWrapper>
  );
};

export default Header;
