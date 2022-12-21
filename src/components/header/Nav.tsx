import NavLink from './NavLink';

const Nav = () => {
  return (
    <nav className="flex items-center  mx-4">
      <NavLink href="/" className="me-2">
        Нүүр
      </NavLink>
      {/* <NavLink href="/trade-in" className="mx-2">
        Trade in
      </NavLink>
      <NavLink href="/wholesale" className="test-text mx-2">
        Бөөндий
      </NavLink> */}
      <NavLink href="/technews" className="ms-2">
        Мэдээ, мэдээлэл
      </NavLink>
    </nav>
  );
};

export default Nav;
