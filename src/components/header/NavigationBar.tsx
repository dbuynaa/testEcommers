import HomeIcon from 'icons/Home';
import Bars from 'icons/Bars';
import Book from 'icons/Book';
import NavItem from './NavItem';
import ScrollWrapper from './Wrapper';

const NavigationBar = () => {
  return (
    <ScrollWrapper className="navbar px-2 justify-between items-center fixed scroll flex lg:hidden ">
      <NavItem text="Нүүр" icon={<HomeIcon />} href="/" />
      <NavItem text="Ангилал" icon={<Bars />} href="/categories" />
      {/* <NavItem text="Хайх" icon={<Magnify />} href="/search" /> */}
      <NavItem text="Technews" icon={<Book />} href="/news" />
      <div style={{ width: '5rem' }}></div>
    </ScrollWrapper>
  );
};

export default NavigationBar;
