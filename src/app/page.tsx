import FeaturedProducts from 'components/home/FeaturedProducts';
import FeaturedCategories from 'components/home/FeaturedCategories';
import CategorySlider from 'components/home/CategorySlider';
import Banner from 'components/home/Banner';
import SliderBanner from 'components/home/Slider';
import Latest from 'components/home/Latest';

export default function Home() {
  return (
    <>
      <div className="container flex flex-col">
        <FeaturedProducts />
        <FeaturedCategories />
        <CategorySlider />
        <Banner />
        <Latest />
        <SliderBanner />
      </div>
    </>
  );
}
