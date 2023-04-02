import Image from 'ui/Image';

const Layout = ({ children, image }: any) => {
  return (
    <div className="login">
      <Image
        alt="login"
        src={image || ''}
        sizes="(max-width: 768px) 0vw, 50vw"
        quality={100}
      />
      <div className="container">
        <div className="row">
          <div className="col-0 col-md-6 relative"></div>
          <div className="col-12 col-md-6 flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
