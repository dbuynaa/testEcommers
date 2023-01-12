'use client';

import Select, { SelectItem } from 'ui/Select';
import { useProducts } from './context';
import { useRouter } from 'next/navigation';

const Header = () => {
  const [productsCount] = useProducts((store) => store.productsCount);
  const [activeCategoryName] = useProducts(
    ({ activeCategoryName }) => activeCategoryName
  );

  return (
    <div className="pb-4 flex items-center justify-between products-header">
      <div className="flex items-center">
        <b className="sbt pe-2 text-blue">
          {activeCategoryName && activeCategoryName}
        </b>
        {productsCount && (
          <div className="sbt text-mid-gray">{productsCount} бүтээгдэхүүн</div>
        )}
      </div>
      <Select defaultValue="new-to-old">
        <SelectItem value="new-to-old">Шинэ нь эхэндээ</SelectItem>
        <SelectItem value="newr">Хуучин нь эхэндээ</SelectItem>
        <SelectItem value="negw">Үнэ өсөхөөр</SelectItem>
        <SelectItem value="negw">Үнэ буурахаар</SelectItem>
      </Select>
    </div>
  );
};

export default Header;
