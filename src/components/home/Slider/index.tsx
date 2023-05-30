
import Slider from 'ui/Slider';
import Image from 'ui/Image';
import Link from 'next/link';
import { isBlank } from 'utils';

const changedSettings = {
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
};

const SliderBanner = ({ sliderBanners }: any) => {
  return (
    <div className="my-3 my-md-4 container" style={{ order: 20 }}>
      <Slider
        {...changedSettings}
        className="banner-slider slick-arrow-standart -slider"
      >
        {(sliderBanners || []).map(
          ({ title, featuredImage, custom, mobile }: any, idx: number) => (
            <Link
              className="-slide ratio relative"
              key={idx}
              href={(custom || {}).link}
              target={isBlank(custom.link)}
            >
              <Image
                alt={title || ''}
                src={featuredImage?.sourceUrl || ''}
                sizes="(max-width: 768px) 0vw, (max-width: 1360px) 100vw, 1360px"
                className="-desktop"
              />
              <Image
                alt={title || ''}
                src={mobile?.img?.sourceUrl || featuredImage?.sourceUrl || ''}
                className="-mobile"
                sizes="(max-width: 768px) 100vw, 0vw"
              />
            </Link>
          )
        )}
      </Slider>
    </div>
  );
};

export default SliderBanner;
