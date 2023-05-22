import Image from 'ui/Image';
import Link from 'next/link';
import { isBlank } from 'utils';

const Banner = ({ imgBanners }: any) => {
  return (
    <>
      {(imgBanners || []).map(
        ({ featuredImage, imgbanner, title, custom }: any, idx: number) => (
          <div
            className="my-3 my-md-4 container"
            key={idx}
            style={{ order: custom?.order }}
          >
            <Link
              href={(custom || {}).link}
              target={isBlank((custom || {}).link)}
              className="relative block img-banner"
            >
              <div
                className="-space"
                style={{ paddingBottom: imgbanner?.ratio + '%' }}
              />
              <Image
                src={featuredImage?.sourceUrl || ''}
                alt={title || ''}
                sizes="(max-width: 1400px) 100vw, 1400px"
              />
            </Link>
          </div>
        )
      )}
    </>
  );
};

export default Banner;
