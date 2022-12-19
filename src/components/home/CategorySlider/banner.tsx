import Image from 'ui/Image';

const Banner = ({ featuredImage, hoverImage }: any) => {
  return (
    <div className="col-3 pe-3 ">
      <div className="relative img-wrap -banner rounded ratio r-4x3">
        <Image
          src={(hoverImage || {}).sourceUrl || (featuredImage || {}).sourceUrl}
          fill
          alt=""
          noWrap
        />
        <Image src={(featuredImage || {}).sourceUrl} fill alt="" noWrap />
      </div>
    </div>
  );
};

export default Banner;
