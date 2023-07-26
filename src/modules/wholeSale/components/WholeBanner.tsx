import React from 'react';
import Image from 'ui/Image';
import Link from 'next/link';
import { isBlank } from 'utils';

const WholeBanner = ({ imgBanners }: any) => {
  // Assuming there's only one item in the imgBanners array
  const { featuredImage, imgbanner, title, custom } = imgBanners[0] || {};

  return (
    <div className="my-3 my-md-4 container" style={{ order: custom?.order }}>
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
  );
};

export default WholeBanner;
    