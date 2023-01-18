import { use } from 'react';

import getProductDetail from 'lib/getProductDetail';
import ImageGallery from 'components/ProductDetail/Images';
import { formatCurrency } from 'utils';
import Actions from 'components/ProductDetail/Actions';
import Tabs, {
  TabsList,
  TabTrigger,
  TabsContent,
} from 'components/ProductDetail/Tabs';
import Description from 'components/ProductDetail/Description';

const Product = ({ params }: any) => {
  const { id } = params;
  const detail = use(getProductDetail(id));

  const { attachment, name, unitPrice, description, code, productCount } =
    detail;

  if (!name || !unitPrice) {
    return null;
  }

  const fixImageUrl = (url: string = '') =>
    url.replace(
      'http://plugin_core_api',
      `${process.env.NEXT_PUBLIC_ERXES_API_URL}`
    );

  return (
    <div className="container prDtl">
      <div className="row py-4">
        <div className="col-12 col-md-6">
          <ImageGallery images={[fixImageUrl((attachment || {}).url)]} />
        </div>
        <div className="col-12 col-md-6 px-md-5 prDtl-actions">
          <h5>{name}</h5>
          <div className="sbt text-mid-gray pb-3">
            Бүтээгдэхүүний код: {code}
          </div>
          <h4>{(unitPrice || '').toLocaleString()} ₮</h4>
          {/* <div className="-count text-mid-gray">
            {productCount} 5 ширхэг бэлэн байна
          </div> */}
          <Actions
            {...detail}
            productImgUrl={fixImageUrl((attachment || {}).url)}
          />
        </div>
      </div>
      <Tabs defaultValue="intro">
        <TabsList>
          {description && (
            <TabTrigger value="intro">
              <div className="p-3">Дэлгэрэнгүй</div>
            </TabTrigger>
          )}
          {/* <TabTrigger value="review">
            <div className="p-3">Шүүмж</div>
          </TabTrigger> */}
        </TabsList>
        {description && (
          <TabsContent value="intro">
            <Description description={description} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Product;
