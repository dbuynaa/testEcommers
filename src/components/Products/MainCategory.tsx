import clsx from 'clsx';
import NavProductsContainer from 'modules/Products/NavProducts';
// import NavProductsContainer from 'modules/Products/NavProducts';
// import NavProductsContainer from 'modules/Products/NavProducts';

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
  const [hoverSide, setHoverSide] = useState('');

  const handleHover = (side: any) => {
    setHoverSide(side);
  };

  return (
    <div className=" flex md:flex-col relative group">
      <Link
        key={_id}
        href={{ pathname: '/products', query: { category: _id } }}
        className={clsx('product-cat', {
          '-active': category === _id
        })}
      >
        <div className="md:flex group-hover:flex bg-bgprimary text-xs laptop:text-[15px]">
          {name}
        </div>
      </Link>
      {!!subCategories?.length && (
        <div className="relative w-full">
          <div className="absolute min-w-full flex-col hidden group-hover:flex bg-bgprimary text-xs p-1 ">
            {subCategories?.map((sub: any) => (
              <Link
                key={sub._id}
                href={{
                  pathname: '/products',
                  query: { category: _id, sub: sub._id }
                }}
              >
                <span
                  className="px-3 py-2 text-white hover:underline w-full flex justify-between group relative"
                  onMouseOver={() => setHover(sub._id)}
                >
                  {sub.name}
                </span>
              </Link>
            ))}
            <div className="absolute top-0 left-full z-20 group-hover:flex hidden w-[800px] h-60 bg-green-200">
              <NavProductsContainer categoryId={hover} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCategory;
