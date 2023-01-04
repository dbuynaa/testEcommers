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
  const cats = use(getMainCategories());

  return (
    <div className="flex items-center product-cats">
      {cats.map(({ _id, name }: any) => (
        <Link
          prefetch={false}
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
