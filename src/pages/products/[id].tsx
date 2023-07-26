import getProductDetail from 'lib/getProductDetail';
import ImageGallery from 'components/ProductDetail/Images';
import Tabs, {
  TabsList,
  TabTrigger,
  TabsContent,
} from 'components/ProductDetail/Tabs';
import Description from 'components/ProductDetail/Description';
import Breadcrumb from 'components/ProductDetail/BreadCrumb';
import Info from 'components/ProductDetail/Info';
import Context from 'components/ProductDetail/Context';
import Advice from 'modules/Products/Advice';
import { getVideosByTag } from 'lib/wp/posts';
import { GetStaticPaths, GetStaticProps } from 'next';
import getProductIds from 'lib/getProductIds';
import { NextSeo } from 'next-seo';
import { readFile } from 'utils';
import LastViewedItemsAdd from 'modules/Products/LastViewedItemsAdd';
import LastViewedItems from 'modules/Products/LastViewedItems';


const Product = ({ detail, videos }: any) => {
  const { name, attachment, customFieldsDataByFieldCode, _id } = detail || {};

  return (
    <>
      <NextSeo
        title={name}
        description={(customFieldsDataByFieldCode || {}).intro?.value}
        openGraph={{
          url: `https://www.technews.mn/products/${_id}`,
          images: [
            {
              url: readFile((attachment || {}).url),
              width: 800,
              height: 800,
              alt: name
            }
          ]
        }}
      />
      <LastViewedItemsAdd productId={_id} />
      <Context>
        <div className="container prDtl ">
          <Breadcrumb />
          <div className="row pb-4">
            <div className="col-12 col-md-6">
              <ImageGallery />
            </div>
            <Info productId={_id} />
          </div>
        </div>
        <Tabs defaultValue="intro">
          <TabsList className="container border-bottom">
            <TabTrigger value="intro">
              <div className="p-2 m-1">Дэлгэрэнгүй</div>
            </TabTrigger>
            {(videos || []).length > 0 && (
              <TabTrigger value="advice">
                <div className="p-2 m-1">Заавар зөвлөгөө </div>
              </TabTrigger>
            )}
          </TabsList>
          <TabsContent value="intro">
            <Description />
          </TabsContent>
          <TabsContent value="intro">
            <LastViewedItems />
          </TabsContent>
          {(videos || []).length > 0 && (
            <TabsContent value="advice">
              <Advice videos={videos} />
            </TabsContent>
          )}
        </Tabs>
      </Context>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params || !params.id) {
    return { notFound: true };
  }

  const id = (params || {}).id + '';
  const { posts: videosById } = await getVideosByTag(id);
  const detail = await getProductDetail(id);
  const { posts: videosByCat } = await getVideosByTag(detail?.categoryId);

  return {
    props: {
      detail: detail || {},
      videos: [...(videosById || []), ...(videosByCat || [])],
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const products = await getProductIds();

  const paths = (products || []).map((item: any) => {
    return { params: { id: item?._id } };
  });

  return {
    paths,
    fallback: true
  };
};

export default Product;
