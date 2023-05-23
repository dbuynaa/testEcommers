import getProductDetail from 'lib/getProductDetail';
import ImageGallery from 'components/ProductDetail/Images';
import Tabs, {
  TabsList,
  TabTrigger,
  TabsContent,
} from 'components/ProductDetail/Tabs';
import Description from 'components/ProductDetail/Description';
import Breadcrumb from 'components/ProductDetail/BreadCrumb';
import { GetServerSideProps } from 'next';
import getCategories from 'lib/getCategories';
import Info from 'components/ProductDetail/Info';
import Context from 'components/ProductDetail/Context';
import Advice from 'modules/Products/Advice';
import { getVideosByTag } from 'lib/wp/posts';

const Product = ({ detail, categories, videos }: any) => {
  return (
    <Context detail={detail} categories={categories}>
      <div className="container prDtl">
        <Breadcrumb />
        <div className="row pb-4">
          <div className="col-12 col-md-6">
            <ImageGallery />
          </div>
          <Info />
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
        {(videos || []).length > 0 && (
          <TabsContent value="advice">
            <Advice videos={videos} />
          </TabsContent>
        )}
      </Tabs>
    </Context>
  );
};

export const runtime = 'experimental-edge';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = (params || {}).id + '';
  const detail = await getProductDetail(id);
  const { categories } = await getCategories();
  const { posts: videosById } = await getVideosByTag(id);
  const { posts: videosByCat } = await getVideosByTag(detail.categoryId);
  return {
    props: {
      detail,
      categories,
      videos: [...(videosById || []), ...(videosByCat || [])],
    },
  };
};

export default Product;
