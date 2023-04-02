import { use } from 'react';
import getCategories from 'lib/getCategories';
import Link from 'next/link';

const MainCategories = ({ mainCategories }: any) => {
  return (
    <div className="flex items-center product-cats hover-scroll -x px-3 px-md-4">
      {(mainCategories || []).map(({ _id, name }: any) => (
        <Link
          key={_id}
          href={{ pathname: '/products', query: { category: _id } }}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default MainCategories;
