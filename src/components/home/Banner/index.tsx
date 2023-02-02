import { use } from 'react';
import { getImgBanner } from 'lib/wp/posts';
import Image from 'ui/Image';
import Link from 'next/link';

const Banner = () => {
  const { posts } = use(getImgBanner());
  return (
    <>
      {(posts || []).map(({ featuredImage, imgbanner, title, custom }, idx) => (
        <div className="my-md-5 my-4 container" key={idx}>
          <Link href={custom.link} className="relative block">
            <div
              className="-space"
              style={{ paddingBottom: imgbanner?.ratio + '%' }}
            />
            <Image
              src={featuredImage?.sourceUrl || ''}
              alt={title || ''}
              sizes="100vw"
            />
          </Link>
        </div>
      ))}
    </>
  );
};

export default Banner;
