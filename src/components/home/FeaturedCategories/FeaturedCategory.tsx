import Image from 'next/image';
import Link from 'next/link';
import { WpPost } from 'lib/wp/posts';

const FeaturedCategory = ({ title, featuredImage, custom }: WpPost) => {
  return (
    <Link className="col-6 col-md-2 text-center p-4" href={custom.link}>
      <div className="img-wrap ratio ratio1x1">
        <Image src={featuredImage?.sourceUrl || ''} fill alt={title || ''} />
      </div>
      <big className="text-black">{title}</big>
    </Link>
  );
};

export default FeaturedCategory;
