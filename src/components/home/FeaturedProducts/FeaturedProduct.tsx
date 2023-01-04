import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import type { WpPost } from 'lib/wp/posts';

interface IProps {
  className: string;
}

const FeaturedProduct = ({
  className,
  featuredImage,
  custom,
}: WpPost & IProps) => {
  return (
    <Link
      href={custom.link}
      prefetch={false}
      className={clsx('ft-product flex img-wrap items-center', className)}
    >
      <Image
        src={featuredImage?.sourceUrl || ''}
        alt=""
        fill
        sizes="(max-width: 768px) 100vw,
              50vw"
        priority
      />
    </Link>
  );
};

export default FeaturedProduct;
