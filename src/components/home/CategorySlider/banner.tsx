import Image from 'ui/Image';
import Link from 'next/link';

const Banner = ({ featuredImage, hoverImage, custom }: any) => {
  return (
    <div className="col-3 pe-3 ">
      <Link
        className="relative img-wrap -banner rounded ratio r-4x3"
        href={'/products?category=' + custom.link}
      >
        <Image
          src={(hoverImage || {}).sourceUrl || (featuredImage || {}).sourceUrl}
          fill
          alt=""
          noWrap
        />
        <Image src={(featuredImage || {}).sourceUrl} fill alt="" noWrap />
      </Link>
    </div>
  );
};

export default Banner;
