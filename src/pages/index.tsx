import FeaturedProducts from 'components/home/FeaturedProducts';
import {
  getGridBanners,
  getFtCats,
  sortPosts,
  getBannerCats,
  getImgBanner,
  getSliderBanner,
} from 'lib/wp/posts';
import FeaturedCategories from 'components/home/FeaturedCategories';
import CategorySlider from 'components/home/CategorySlider';
import Banner from 'components/home/Banner';
import SliderBanner from 'components/home/Slider';
import Latest from 'components/home/Latest';
import Head from 'next/head';

const Home = ({
  ftItems,
  ftCats,
  bannerCats,
  imgBanners,
  sliderBanners,
}: any) => {
  return (
    <div className="flex flex-col home">
      <FeaturedProducts ftItems={ftItems} />
      <FeaturedCategories ftCats={ftCats} />
      <CategorySlider bannerCats={bannerCats} />
      <Banner imgBanners={imgBanners} />
      <Latest />
      <SliderBanner sliderBanners={sliderBanners}/>
    </div>
  );
};

export const getStaticProps = async () => {
  const { posts: ftItems } = await getGridBanners();
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
    },
    revalidate: 60,
  };
};

export default Home;
