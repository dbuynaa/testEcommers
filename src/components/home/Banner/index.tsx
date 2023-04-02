import Image from 'ui/Image';
import Link from 'next/link';

const Banner = ({ imgBanners }: any) => {
  return (
    <>
      {(imgBanners || []).map(
        ({ featuredImage, imgbanner, title, custom }: any, idx: number) => (
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
        )
      )}
    </>
  );
};

export default Banner;
