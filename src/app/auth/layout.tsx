const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="container ">
      <div className="row login">
        <div className="col-6"></div>
        <div className="col-6 flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
