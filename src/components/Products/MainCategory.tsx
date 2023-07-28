import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import Modal from 'ui/Modal';
// import Image from 'ui/Image';
const MainCategory = ({
  _id,
  name,
  attachment,
  subCategories
}: {
  _id: string;
  name: string;
  attachment: string;
  subCategories: any;
}) => {
  const router = useRouter();
  const { category } = router.query;
  const [enter, setEnter] = useState(false);
  const [sss, sssss] = useState(false);
  return (
    <div className=" flex md:flex-col group">
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
        <div className="relative min-w-full ">
          <div
            className="absolute min-w-full flex-col hidden group-hover:flex bg-bgprimary text-xs p-1 rounded-b-md "
            onMouseOver={() => setEnter(true)}
          >
            {subCategories?.map((sub) => (
              <Link
                key={sub._id}
                href={{
                  pathname: '/products',
                  query: { category: _id, sub: sub._id }
                }}
              >
                <div
                  className="px-3 py-2 text-white hover:underline  w-full min-w-[180px]"
                  onMouseOver={() => sssss(true)}
                >
                  {sub.name}
                </div>
                {sss === true && (
                  <div className="px-3 py-2 text-white hover:underline  w-full min-w-[180px]">
                    <text>
                      asddasdsadasdaasdagsdhdjghadghdjdghssdgasajghajdgjh
                    </text>
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCategory;
