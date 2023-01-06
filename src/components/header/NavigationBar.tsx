import HomeIcon from 'icons/Home';
import Bars from 'icons/Bars';
import Magnify from 'icons/Magnify';
import Book from 'icons/Book';
import UserV from 'icons/UserV';
import NavItem from './NavItem';

const NavigationBar = () => {
  return (
    <div
      className="navbar px-2 flex justify-between items-center fixed"
      id="navbar"
    >
      <NavItem text="Нүүр" icon={<HomeIcon />} href="/" />
      <NavItem text="Ангилал" icon={<Bars />} href="/categories" />
      <NavItem text="Хайх" icon={<Magnify />} href="/search" />
      <NavItem text="Technews" icon={<Book />} href="/news" />
      <NavItem text="Профайл" icon={<UserV />} href="/profile" />
    </div>
  );
};

export default NavigationBar;
