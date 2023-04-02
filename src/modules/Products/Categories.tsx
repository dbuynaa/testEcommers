
import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import { usePathname } from 'next/navigation';
import Loading from 'ui/Loading';
import CheckDevice from 'modules/CheckDevice';

const Categories = dynamic(() => import('components/Products/Categories'), {
  suspense: true,
});
const MobileCategories = dynamic(
  () => import('components/Products/MobileCategories'),
  {
    suspense: true,
  }
);

// test

const CategoriesContainer = () => {
  const { data, loading } = useQuery(queries.productCategories);
  const pathname = usePathname();

  if (loading) return <Loading />;

  const categories = (data || {}).poscProductCategories || [];

  const rootCatergories = categories.filter(
    ({ parentId }: { parentId: string }) => !parentId
  );

  if (pathname === '/categories')
    return (
      <Categories categories={categories} rootCatergories={rootCatergories} />
    );

  return (
    <CheckDevice
      Desktop={
        <Categories categories={categories} rootCatergories={rootCatergories} />
      }
      Mobile={
        <MobileCategories
          categories={categories}
          rootCatergories={rootCatergories}
        />
      }
    />
  );
};

export default CategoriesContainer;
