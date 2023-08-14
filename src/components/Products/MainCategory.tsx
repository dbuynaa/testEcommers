import clsx from 'clsx';
import NavProductsContainer from 'modules/Products/NavProducts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// import Image from 'ui/Image';
const MainCategory = ({ _id, name, subCategories }: { _id: string; name: string; subCategories: any }) => {
  const router = useRouter();
  const { category, sub } = router.query;
  const [hover, setHover] = useState(_id);

  const handleHover = (id) => {
    setHover(id);
  };

  return (
    <div className="group">
      <Link
        key={_id}
        href={{ pathname: '/products', query: { category: _id } }}
        className={clsx('product-cat', {
          '-active': category === _id,
        })}
      >
        <div className="md:flex items-center justify-center gap-3 group-hover:flex bg-bgprimary text-xs laptop:text-[15px] hover:text-yellow-400">
          {name}
        </div>
      </Link>

      <div className="">
        {!!subCategories?.length && (
          <div className="absolute w-100 top-[36px] left-[15px] flex-row group-hover:flex bg-bgprimary text-xs h-[360px] hidden">
            <div className="flex w-100">
              <div className="nav-left-sidebar">
                {subCategories &&
                  subCategories?.map((sub: any) => (
                    <Link
                      style={{ display: 'inherit' }}
                      key={sub._id}
                      href={{
                        pathname: '/products',
                        query: { category: _id, sub: sub._id },
                      }}
                    >
                      <div className="pl-2 pt-2 flex-col justify-between items-start inline-flex">
                        <div className="flex-col justify-center items-center flex">
                          <div className="side-link" onMouseOver={() => handleHover(sub._id)}>
                            {sub.name}
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
              <div className="nav-right-sidebar">
                <NavProductsContainer categoryId={hover} />
                <div className="see-all-products">
                  <Link
                    href={{
                      pathname: '/products',
                      query: { category: _id, sub: hover },
                    }}
                  >
                    Бүгдийг үзэх
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCategory;
