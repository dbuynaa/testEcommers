import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'ui/Image';
const WholesaleSub = ({
  _id,
  attachment,
  subCategories
}: {
  _id: string;
  attachment:{url:string} 
  subCategories: any;
}) => {
  const router = useRouter();
  const { category } = router.query;
  return (
    <div className=" flex md:flex-col group">
      <Link
        key={_id}
        href={{ pathname: '/wholesale', query: { category: _id } }}
        className={clsx('product-cat', {
          '-active': category === _id
        })}
      >
          <div className="img-wrap">
        <Image
          src='/images/realme.png'
          alt=""
          sizes="(max-width: 768px) 50vw, (max-width: 1500px) 25vw, 20vw"
          contain
          withLoader
          className=" hover:scale-105 transition duration-100 cursor-pointer ease-in"
        />
      </div>
      </Link>
      {!!subCategories?.length && (
        <div className="relative min-w-full ">
          <div className="absolute min-w-full flex-col hidden group-hover:flex bg-bgprimary text-xs p-1 rounded-b-md">
            {subCategories?.map((sub) => (
              <Link
                key={sub._id}
                href={{
                  pathname: '/wholesale',
                  query: { category: _id, sub: sub._id }
                }}
              >
                <div className="px-3 py-2 text-white hover:underline  w-full min-w-[180px]">
                  {sub.attachment}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WholesaleSub;
