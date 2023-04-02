import getProductDetail from 'lib/getProductDetail';
import ImageGallery from 'components/ProductDetail/Images';
import Actions from 'components/ProductDetail/Actions';
import Tabs, {
  TabsList,
  TabTrigger,
  TabsContent,
} from 'components/ProductDetail/Tabs';
import Description from 'components/ProductDetail/Description';
import Breadcrumb from 'components/ProductDetail/BreadCrumb';
import { GetStaticPaths, GetStaticProps } from 'next';
import getCategories from 'lib/getCategories';
import { getProductInfo } from 'lib/wp/posts';
import { formatCurrency } from 'utils';

const Product = ({ detail, categories, wp }: any) => {
  const {
    attachment,
    name,
    unitPrice,
    description,
    code,
    productCount,
    attachmentMore,
    _id,
    categoryId,
  } = detail;

  const fixImageUrl = (url: string = '') =>
    url.replace(
      'http://plugin_core_api',
      `${process.env.NEXT_PUBLIC_ERXES_API_URL}`
    );

  const moreImage = (attachmentMore || []).map(({ url }: { url: string }) =>
    fixImageUrl(url)
  );

  if (!name || !unitPrice) {
    return null;
  }

  return (
    <>
      <div className="container prDtl">
        <Breadcrumb
          categoryId={categoryId}
          name={name}
          categories={categories}
        />
        <div className="row pb-4">
          <div className="col-12 col-md-6">
            <ImageGallery
              images={[fixImageUrl((attachment || {}).url), ...moreImage]}
            />
          </div>
          <div className="col-12 col-md-6 px-md-5 prDtl-actions">
            <h5>{name}</h5>
            <div className="sbt text-mid-gray pb-3">
              Бүтээгдэхүүний код: {code}
            </div>
            <h4>{formatCurrency(unitPrice)}</h4>
            <div className="-count text-mid-gray">
              <b>{productCount || 5}</b> ширхэг бэлэн байна
            </div>

            <div
              dangerouslySetInnerHTML={{ __html: description }}
              className="pt-4 prDtl-description"
            />

            <Actions
              {...detail}
              productImgUrl={fixImageUrl((attachment || {}).url)}
            />
          </div>
        </div>
      </div>
      <Tabs defaultValue="intro">
        <TabsList className="container">
          {_id && (
            <TabTrigger value="intro">
              <div className="p-3">Дэлгэрэнгүй</div>
            </TabTrigger>
          )}
        </TabsList>
        {_id && (
          <TabsContent value="intro">
            <Description categoryId={categoryId} wp={wp} />
          </TabsContent>
        )}
      </Tabs>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = (params || {}).id + '';
  const detail = await getProductDetail(id);
  const { categories } = await getCategories();
  const { post } = await getProductInfo(id.toLowerCase());
  return {
    props: {
      detail,
      categories,
      wp: post,
    },
    revalidate: 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

export default Product;
