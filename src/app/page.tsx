import FeaturedProducts from 'components/home/FeaturedProducts';
import FeaturedCategories from 'components/home/FeaturedCategories';
import CategorySlider from 'components/home/CategorySlider';

export default function Home() {
  return (
    <div className="container">
      <FeaturedProducts />
      <FeaturedCategories />
      <CategorySlider />
    </div>
  );
}
