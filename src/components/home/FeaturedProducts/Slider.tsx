import Link from 'next/link';
import Slider from 'ui/Slider';
import Image from 'ui/Image';
import { isBlank } from 'utils';

const changedSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  arrows: false,
  fade: true,
};

const FeaturedSlider = ({ sliders }) => {
  return (
    <Slider
      {...changedSettings}
      className="banner-slider slick-arrow-standart -slider"
    >
      {(sliders || []).map(
        ({ title, featuredImage, custom }: any, idx: number) => (
          <Link
            className="-slide ft-product relative big"
            key={idx}
            href={(custom || {}).link || ''}
            target={isBlank(custom.link)}
          >
            <Image
              alt={title || ''}
              src={featuredImage?.sourceUrl || ''}
              sizes="(max-width: 1360px) 100vw, 1360px"
            />
          </Link>
        )
      )}
    </Slider>
  );
};

export default FeaturedSlider;
