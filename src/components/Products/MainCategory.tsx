import clsx from 'clsx';
import NavProductsContainer from 'modules/Products/NavProducts';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

// import Image from 'ui/Image';
const MainCategory = ({
  _id,
  name,
  subCategories
}: {
  _id: string;
  name: string;
  subCategories: any;
}) => {
  const router = useRouter();
  const { category, sub } = router.query;
  const [hover, setHover] = useState('');

  const hovering = (id) => {
    console.log(id);
    setHover(id);
  };

  return (
    <div className="container group ">
      <Link
        key={_id}
        href={{ pathname: '/products', query: { category: _id } }}
        className={clsx('product-cat', {
          '-active': category === _id
        })}
      >
        <div className="md:flex items-center justify-center gap-3 group-hover:flex bg-bgprimary text-xs laptop:text-[15px] pt-3 hover:text-yellow-400">
          {name}
        </div>
      </Link>

      <div className="">
        {!!subCategories?.length && (
          <div className="absolute w-screen top-12 left-7 flex-row hidden group-hover:flex bg-bgprimary text-xs p-1">
            <div className="flex flex-col">
              {subCategories &&
                subCategories?.map((sub: any) => (
                  <>
                    <Link
                      key={sub._id}
                      href={{
                        pathname: '/products',
                        query: { category: _id, sub: sub._id }
                      }}
                      legacyBehavior
                    >
                      <a>
                        <div className="w-48 h-16 pl-2 pt-2 bg-gray-700 flex-col justify-between items-start inline-flex">
                          <div className="flex-col justify-center items-center flex">
                            <div
                              className="text-white hover:underline text-base font-bold leading-normal tracking-tight "
                              onMouseOver={() => hovering(sub._id)}
                            >
                              {sub.name}
                            </div>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </>
                ))}
            </div>
            <div className="bg-bgprimary">
              <NavProductsContainer categoryId={hover} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCategory;
