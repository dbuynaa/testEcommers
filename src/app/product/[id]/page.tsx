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

  const { attachment, name, unitPrice, description } = detail;

  const fixImageUrl = (url: string = '') =>
    url.replace(
      'http://plugin_core_api',
      `${process.env.NEXT_PUBLIC_ERXES_API_URL}`
    );

  return (
    <div className="container prDtl">
      <div className="row py-4">
        <div className="col-6">
          <ImageGallery images={[fixImageUrl((attachment || {}).url)]} />
        </div>
        <div className="col-6 px-5 prDtl-actions">
          <h5>{name}</h5>
          <div className="sbt text-mid-gray pb-3"></div>
          <h5>{formatCurrency(unitPrice)} ₮</h5>
          <Actions
            {...detail}
            productImgUrl={fixImageUrl((attachment || {}).url)}
          />
        </div>
      </div>
      <Tabs defaultValue="intro">
        <TabsList>
          <TabTrigger value="intro">Дэлгэрэнгүй</TabTrigger>
          <TabTrigger value="review">Шүүмж</TabTrigger>
        </TabsList>
        <TabsContent value="intro">
          <Description description={description} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Product;
