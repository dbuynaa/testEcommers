import Image from 'next/image';
import Link from 'next/link';

const FeaturedCategory = ({
  title,
  featuredImage,
  more,
}: {
  title: string;
  featuredImage: { sourceUrl: string };
  more: { pathname: string };
}) => {
  return (
    <Link className="col-2 text-center px-4" href={more.pathname}>
      <div className="img-wrap ratio1x1">
        <Image src={featuredImage.sourceUrl} fill alt={title} />
      </div>
      <big className="text-black">{title}</big>
    </Link>
  );
};

export default FeaturedCategory;
