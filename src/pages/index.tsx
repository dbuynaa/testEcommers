import FeaturedProducts from 'components/home/FeaturedProducts';
import {
  getGridBanners,
  getFtCats,
  sortPosts,
  getBannerCats,
  getImgBanner,
  getSliderBanner,
  getGridSliders
} from 'lib/wp/posts';
import FeaturedCategories from 'components/home/FeaturedCategories';
import CategorySlider from 'components/home/CategorySlider';
import Banner from 'components/home/Banner';
import SliderBanner from 'components/home/Slider';
import Latest from 'components/home/Latest';
import SaleProduct from 'modules/Products/SaleProduct';
// import Sale from 'components/SaleProduct';

// import LastViewedItems from 'modules/Products/LastViewedItems';

const Home = ({
  ftItems,
  ftCats,
  bannerCats,
  imgBanners,
  sliderBanners,
  gridSliders
}: any) => {
  return (
    <div className="flex flex-col home pb-3">
      <FeaturedProducts ftItems={ftItems} gridSliders={gridSliders} />
      <FeaturedCategories ftCats={ftCats} />
      <CategorySlider bannerCats={bannerCats} />
      <Banner imgBanners={imgBanners} />
      <Latest />
      <SaleProduct productId={''} />
      <SliderBanner sliderBanners={sliderBanners} />
      {/* <LastViewedItems /> */}
    </div>
  );
};

export const getStaticProps = async () => {
  const { posts: ftItems } = await getGridBanners();
  const { posts: gridSliders } = await getGridSliders();
  const { posts: ftCats } = await getFtCats();
  const { posts: bannerCats } = await getBannerCats();
  const { posts: imgBanners } = await getImgBanner();
  const { posts: sliderBanners } = await getSliderBanner();
  return {
    props: {
      ftItems: sortPosts(ftItems || []),
      ftCats: sortPosts(ftCats || []),
      sliderBanners: sortPosts(sliderBanners || []),
      bannerCats,
      imgBanners,
      gridSliders: sortPosts(gridSliders || [])
    }
  };
};

export default Home;
