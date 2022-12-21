import { use } from 'react';
import Image from 'ui/Image';
import { getLogin } from 'lib/wp/page';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { page } = use(getLogin());
  return (
    <div className="container ">
      <div className="row login">
        <div className="col-6 relative">
          <Image
            noWrap
            alt="login"
            src={page?.featuredImage?.sourceUrl || ''}
            sizes="50vw"
            fill
          />
        </div>
        <div className="col-6 flex items-center justify-center">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
