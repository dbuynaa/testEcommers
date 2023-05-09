import dynamic from 'next/dynamic';
import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import Loading from 'ui/Loading';
import CheckDevice from 'modules/CheckDevice';
import { useRouter } from 'next/router';

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

const CategoriesContainer = ({ isMobile }: { isMobile?: boolean }) => {
  const router = useRouter();
  const { category } = router.query;

  const { data, loading } = useQuery(queries.productCategories, {
    variables: {
      parentId: isMobile ? category : null,
    },
  });

  if (loading) return <Loading className='p-3'/>;

  const categories = (data || {}).poscProductCategories || [];

  if (router.pathname === '/categories')
    return <Categories categories={categories} showAll />;

  return (
    <CheckDevice
      Desktop={<Categories categories={categories} />}
      Mobile={<MobileCategories categories={categories} />}
    />
  );
};

export default CategoriesContainer;
