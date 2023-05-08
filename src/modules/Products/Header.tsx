import Select, { SelectItem } from 'ui/Select';
import {
  useProductsCount,
  useActiveCategoryName,
} from 'modules/Products/context';
import { useRouter } from 'next/router';

const Header = () => {
  const activeCategoryName = useActiveCategoryName();
  const productsCount = useProductsCount();
  const router = useRouter();
  const { category: categoryId, sortField, sortDirection } = router.query;
  const handleValueChange = (value: string) => {
    const params = value.split('&');
    router.push({
      pathname: '/products',
      query: {
        category: categoryId || '',
        sortField: params[0],
        sortDirection: params[1],
      },
    });
  };

  const value = `${sortField || 'createdAt'}&${sortDirection || '-1'}`;

  // categoryId, sortField, sortDirection

  return (
    <div className="pb-2 mb-3 flex items-center products-header">
      <b className="pe-2 text-blue">
        {activeCategoryName && activeCategoryName}
      </b>
      <div className="flex items-center pb-1">
        {!!productsCount && (
          <div className="text-mid-gray products-header-count px-md-3">
            {productsCount} бүтээгдэхүүн
          </div>
        )}
        <Select value={value} onValueChange={handleValueChange}>
          <SelectItem value="createdAt&-1">Шинэ нь эхэндээ</SelectItem>
          <SelectItem value="createdAt&1">Хуучин нь эхэндээ</SelectItem>
          <SelectItem value="unitPrice&1">Үнэ өсөхөөр</SelectItem>
          <SelectItem value="unitPrice&-1">Үнэ буурахаар</SelectItem>
        </Select>
      </div>
    </div>
  );
};

export default Header;
