import Image from 'ui/Image';
import Link from 'next/link';

const Banner = ({ featuredImage, hoverImage, custom }: any) => {
  return (
    <div className="col-12 col-md-3 pe-md-3 ">
      <Link
        className="img-wrap -banner rounded ratio r-4x3"
        href={'/products?category=' + custom.link}
      >
        <Image
          src={(hoverImage || {}).sourceUrl || (featuredImage || {}).sourceUrl}
          alt=""
          sizes="(max-width: 768px) 100vw,
          (max-width: 1500px) 25vw,
          20vw"
        />
        <Image
          src={(featuredImage || {}).sourceUrl}
          alt=""
          sizes="(max-width: 768px) 100vw,
          (max-width: 1500px) 25vw,
          20vw"
        />
      </Link>
    </div>
  );
};

export default Banner;
