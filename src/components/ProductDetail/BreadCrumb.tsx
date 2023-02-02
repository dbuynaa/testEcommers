import Link from 'next/link';
import { use } from 'react';
import getCategories from 'lib/getCategories';

const Breadcrumb = ({ categoryId }: { categoryId: string }) => {
  const { categories } = use(getCategories());
  console.log(categories);

  const category = (categories || []).find(
    ({ _id }: any) => _id === categoryId
  );

  return (
    <div className="py-4 container c-xl">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link href="/">Нүүр</Link>
        </li>
        <li className="breadcrumb-item">
          <Link href="/products?category=smartphones">Ухаалаг утас</Link>
        </li>
        <li className="breadcrumb-item">
          <Link href="/products?category=samsung">Samsung</Link>
        </li>
        <li className="breadcrumb-item">
          <Link href="/products?category=samsung-s-series">S series</Link>
        </li>
        <li className="breadcrumb-item">Galaxy S22 Ultra /128GB/</li>
      </ol>
    </div>
  );
};

export default Breadcrumb;
