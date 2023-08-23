import NavLink from './NavLink';

const Nav = () => {
  return (
    <nav className="flex items-center  mx-4 hidden-mobile ">
      <NavLink href="/" className="me-2">
        Нүүр
      </NavLink>
      {/* <NavLink href="/wholesale" className="test-text mx-2">
        Бөөндий
      </NavLink> */}

      {/* <NavLink href="/trade-in" className="mx-2">
        Бренд
      </NavLink> */}
      <NavLink href="/news" className="ms-2">
        Мэдээлэл
      </NavLink>
      <NavLink href="/leasing-form" className="ms-2">
        Зээлээр авах
      </NavLink>
      <NavLink href="/sale" className="ms-2">
        Хямдралтай
        <span className="sale-badge">sale</span>
      </NavLink>
    </nav>
  );
};

export default Nav;
