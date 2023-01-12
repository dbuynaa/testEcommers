import { use } from 'react';
import { getImgBanner } from 'lib/wp/posts';
import Image from 'ui/Image';
import Link from 'next/link';

const Banner = () => {
  const { posts } = use(getImgBanner());
  return (
    <>
      {(posts || []).map(({ featuredImage, imgbanner, title, custom }, idx) => (
        <div className="py-3 py-md-5" key={idx}>
          <Link href={custom.link} className="relative block">
            <div
              className="-space"
              style={{ paddingBottom: imgbanner?.ratio + '%' }}
            />
            <Image
              src={featuredImage?.sourceUrl || ''}
              alt={title || ''}
              sizes="(max-width: 1500px) 100vw,
  90vw"
            />
          </Link>
        </div>
      ))}
    </>
  );
};

export default Banner;
