import clsx from 'clsx';
import Image from 'ui/Image';
import Link from 'next/link';
import type { WpPost } from 'lib/wp/posts';
import { isBlank } from 'utils';

interface IProps {
  className: string;
  sizes?: string;
}

const FeaturedProduct = ({
  className,
  featuredImage,
  custom,
  sizes,
}: WpPost & IProps) => {
  const { link } = custom || {};
  return (
    <Link
      href={link}
      className={clsx('ft-product flex img-wrap items-center', className)}
      target={isBlank(link)}
    >
      <Image
        src={featuredImage?.sourceUrl || ''}
        alt=""
        priority
        sizes={sizes}
      />
    </Link>
  );
};

export default FeaturedProduct;
