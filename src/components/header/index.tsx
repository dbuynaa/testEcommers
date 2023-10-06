import Logo from "icons/logo";
import Link from "next/link";
import Cart from "./Cart";
import ScrollWrapper from "./Wrapper";
import Nav from "./Nav";
import Search from "./Search";
import MainCategories from "modules/Products/MainCategories";
import Profile from "./Profile";
import Top from "./top";
import useScrollDirection from "lib/useScrollDirection";
import { AnimatePresence } from "framer-motion";
import Wishlist from "./Wishlist";

const Header = ({ mainCategories, contact }: any) => {
  const direction = useScrollDirection();
  return (
    <>
      <ScrollWrapper className="header scroll">
        <header>
          <AnimatePresence>
            {direction !== "down" && <Top contact={contact} />}
          </AnimatePresence>
          <div className="flex py-2 py-md-3 justify-between items-center container">
            <div className="col-md-9">
              <div className="flex items-center">
                <Link href="/">
                  <Logo className="logo filter brightness-0 invert" />
                </Link>
                <Search desktop />
                <Nav />
              </div>
            </div>
            <div className="flex items-center">
              <Search />
              <Wishlist />
              <Cart />
              <Profile />
            </div>
          </div>
          <MainCategories mainCategories={mainCategories} _id={""} name={""} />
        </header>
      </ScrollWrapper>
    </>
  );
};

export default Header;
