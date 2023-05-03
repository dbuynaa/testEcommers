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
import { getProductInfo } from 'lib/wp/posts';
import Info from 'components/ProductDetail/Info';
import Context from 'components/ProductDetail/Context';

const Product = ({ detail, categories, wp }: any) => {
  return (
    <Context detail={detail} categories={categories} wp={wp}>
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
        <TabsList className="container">
          <TabTrigger value="intro">
            <div className="p-3">Дэлгэрэнгүй</div>
          </TabTrigger>
        </TabsList>
        <TabsContent value="intro">
          <Description />
        </TabsContent>
      </Tabs>
    </Context>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
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
  };
};

export default Product;
