import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';

const MainCategories = ({ mainCategories }: any) => {
  const router = useRouter();
  const { category } = router.query;

  return (
    <div className="product-cats hover-scroll">
      <div className="container flex items-center px-3">
        {(mainCategories || []).map(({ _id, name }: any) => (
          <Link
            key={_id}
            href={{ pathname: '/products', query: { category: _id } }}
            className={clsx('product-cat', { '-active': category === _id })}
          >
            {name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MainCategories;
