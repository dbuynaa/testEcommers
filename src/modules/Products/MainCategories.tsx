import { use } from 'react';
import getCategories from 'lib/getCategories';
import Link from 'next/link';

async function getMainCategories() {
  const { categories, rootCatergories } = await getCategories();

  const mainCategories = categories.filter(
    ({ parentId }: { parentId: string }) =>
      rootCatergories.map(({ _id }: { _id: string }) => _id).indexOf(parentId) >
      -1
  );

  return [...rootCatergories, ...mainCategories];
}

const MainCategories = () => {
  const { rootCatergories } = use(getCategories());

  return (
    <div className="flex items-center product-cats hover-scroll -x">
      {rootCatergories.map(({ _id, name }: any) => (
        <Link
          key={_id}
          href={{ pathname: '/products', query: { category: _id } }}
          prefetch={false}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};

export default MainCategories;
