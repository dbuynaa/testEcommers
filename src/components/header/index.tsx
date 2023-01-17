import Logo from 'icons/logo';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Cart from './Cart';
import CheckDevice from 'modules/CheckDevice';
import ScrollWrapper from './Wrapper';

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

const Profile = dynamic(() => import('./Profile'), {
  suspense: true,
});

const Header = () => {
  return (
    <ScrollWrapper className="header scroll">
      <header>
        <div className="container pt-1">
          <div className="flex py-3 justify-between">
            <div className="col-9">
              <div className="flex items-center">
                <Link href="/">
                  <Logo className="logo" />
                </Link>
                <CheckDevice Desktop={<Search />} Mobile={null} />
                <CheckDevice Desktop={<Nav />} Mobile={null} />
              </div>
            </div>
            <div className="flex items-center">
              <Cart />
              <CheckDevice Desktop={<Profile />} />
            </div>
          </div>
          <CheckDevice Desktop={<MainCategories />} Mobile={null} />
        </div>
      </header>
    </ScrollWrapper>
  );
};

export default Header;
