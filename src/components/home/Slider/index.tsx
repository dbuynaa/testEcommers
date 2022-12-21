import { use } from 'react';
import Slider from 'ui/Slider';
import Image from 'ui/Image';
import { getSliderBanner, sortPosts } from 'lib/wp/posts';
import Link from 'next/link';
import Button from 'ui/Button';

const changedSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
};

const SliderBanner = () => {
  const { posts } = use(getSliderBanner());
  return (
    <div className="py-5">
      <Slider {...changedSettings} className="banner-slider">
        {sortPosts(posts || []).map(({ title, featuredImage, custom }, idx) => (
          <Link
            className="-slide ratio relative"
            key={idx}
            href={custom.link}
            target={custom.link.includes('http') ? '_blank' : undefined}
          >
            <Image
              fill
              alt={title || ''}
              noWrap
              src={featuredImage?.sourceUrl || ''}
              quality={100}
              sizes="100vw"
            />
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default SliderBanner;
