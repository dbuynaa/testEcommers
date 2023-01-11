import clsx from 'clsx';
import Image from 'ui/Image';
import Link from 'next/link';
import type { WpPost } from 'lib/wp/posts';

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
  return (
    <Link
      href={custom.link}
      className={clsx('ft-product flex img-wrap items-center', className)}
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
