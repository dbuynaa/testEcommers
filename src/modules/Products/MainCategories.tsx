// import Link from 'next/link';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import clsx from 'clsx';
import { useState } from 'react';
type Category = {
  _id: string;
  name: string;
  parentId: string;
};
const MainCategories = ({ mainCategories }) => {
  const router = useRouter();
  const { category } = router.query;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };
  console.log('category', mainCategories);

  return (
    <div className=" product-cats hidden sm:hidden  md:hidden md:max-w-text-[6px] min-lg:hidden lg:flex xl:flex">
      <div className="   lg:flex min-w-max container  justify-between md:text-[8px] ">
        {mainCategories
          .filter((a) => !a.parentId)
          .map(({ _id, name }): any => {
            const subCategories = mainCategories.filter(
              (a) => a.parentId === _id
            );

            return (
              <div
                className=" flex md:flex-col   group "
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                key={_id}
              >
                <Link
                  key={_id}
                  href={{ pathname: '/products', query: { category: _id } }}
                  className={clsx('product-cat', {
                    '-active': category === _id
                  })}
                >
                  <div
                    className=" md:flex group-hover:flex bg-bgprimary "
                    onClick={toggleDropdown}
                  >
                    {name}
                  </div>
                </Link>
                <div className="relative min-w-full ">
                  <div className="absolute min-w-full flex-col hidden group-hover:flex bg-bgprimary text-xs py-0.5">
                    {subCategories?.map((sub) => (
                      <div
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        key={sub._id}
                      >
                        <Link
                          key={sub._id}
                          href={{
                            pathname: '/products',
                            query: { category: _id, sub: sub._id }
                          }}
                        >
                          <div
                            className="px-2 py-2 text-white hover:bg-slate-400 min-w-full"
                            onClick={toggleDropdown}
                          >
                            {sub.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

/* <div className="container flex items-center hover-scroll -x">
        {(mainCategories || []).map(({ _id, name }: any) => (
          <Link
            key={_id}
            href={{ pathname: '/products', query: { category: _id } }}
            className={clsx('product-cat', {
              '-active': category === _id,
            })}
          >
            {name}
            {/* <button
              className="hover:opacity-50 cursor-default"
              onClick={toggleDropdown}
            >
              {product}
            </button> */
// </Link>
// ))}
// </div> */

export default MainCategories;
