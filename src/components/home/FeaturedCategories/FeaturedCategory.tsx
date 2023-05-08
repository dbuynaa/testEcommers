import Image from 'ui/Image';
import Link from 'next/link';
import { WpPost } from 'lib/wp/posts';
import { isBlank } from 'utils';

const FeaturedCategory = ({ title, featuredImage, custom }: WpPost) => {
  const { link } = custom || {};
  return (
    <Link
      className="col-4 col-md-2 text-center p-md-3 -item"
      href={link}
      target={isBlank(link)}
    >
      <div className="img-wrap ratio ratio1x1">
        <Image
          src={featuredImage?.sourceUrl || ''}
          alt={title || ''}
          sizes='sizes="(max-width: 768px) 50vw,
          (max-width: 1500px) 25vw,
          20vw"'
        />
      </div>
      <p className="-item-title">{title}</p>
    </Link>
  );
};

export default FeaturedCategory;
