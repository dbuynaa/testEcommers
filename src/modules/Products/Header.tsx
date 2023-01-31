'use client';

import Select, { SelectItem } from 'ui/Select';
import { useProducts } from './context';
import { useRouter, useSearchParams } from 'next/navigation';

const Header = () => {
  const [productsCount] = useProducts((store) => store.productsCount);
  const [activeCategoryName] = useProducts(
    ({ activeCategoryName }) => activeCategoryName
  );
  const router = useRouter();
  const searchParams = useSearchParams();
  const sortField = searchParams.get('sortField');
  const sortDirection = searchParams.get('sortDirection');
  const categoryId = searchParams.get('category');

  const handleValueChange = (value: string) => {
    const params = value.split('&');
    router.push(
      `/products?category=${categoryId}&sortField=${params[0]}&sortDirection=${params[1]}`
    );
  };

  const value = `${sortField || 'createdAt'}&${sortDirection || '-1'}`;

  // categoryId, sortField, sortDirection

  return (
    <div className="pb-4 flex items-center justify-between products-header">
      <div className="flex items-center">
        <b className="sbt pe-2 text-blue">
          {activeCategoryName && activeCategoryName}
        </b>
        {!!productsCount && (
          <div className="sbt text-mid-gray">{productsCount} бүтээгдэхүүн</div>
        )}
      </div>
      <Select value={value} onValueChange={handleValueChange}>
        <SelectItem value="createdAt&-1">Шинэ нь эхэндээ</SelectItem>
        <SelectItem value="createdAt&1">Хуучин нь эхэндээ</SelectItem>
        <SelectItem value="unitPrice&1">Үнэ өсөхөөр</SelectItem>
        <SelectItem value="unitPrice&-1">Үнэ буурахаар</SelectItem>
      </Select>
    </div>
  );
};

export default Header;
