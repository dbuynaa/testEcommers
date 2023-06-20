import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';

const MainCategory = ({
  _id,
  name,
  subCategories,
}: {
  _id: string;
  name: string;
  subCategories: any;
}) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <div className=" flex md:flex-col group">
      <Link
        key={_id}
        href={{ pathname: '/products', query: { category: _id } }}
        className={clsx('product-cat', {
          '-active': category === _id,
        })}
      >
        <div className="md:flex group-hover:flex bg-bgprimary text-xs laptop:text-[15px]">
          {name}
        </div>
      </Link>
      {!!subCategories?.length && (
        <div className="relative min-w-full ">
          <div className="absolute min-w-full flex-col hidden group-hover:flex bg-bgprimary text-xs p-1 rounded-b-md">
            {subCategories?.map((sub) => (
              <Link
                key={sub._id}
                href={{
                  pathname: '/products',
                  query: { category: _id, sub: sub._id },
                }}
              >
                <div className="px-3 py-2 text-white hover:underline  w-full min-w-[180px]">
                  {sub.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCategory;
