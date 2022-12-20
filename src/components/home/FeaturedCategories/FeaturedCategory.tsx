import Image from 'next/image';
import Link from 'next/link';
import { WpPost } from 'lib/wp/posts';

const FeaturedCategory = ({ title, featuredImage, custom }: WpPost) => {
  return (
    <Link className="col-2 text-center px-4" href={custom.link}>
      <div className="img-wrap ratio1x1">
        <Image src={featuredImage?.sourceUrl || ''} fill alt={title || ''} />
      </div>
      <big className="text-black">{title}</big>
    </Link>
  );
};

export default FeaturedCategory;
