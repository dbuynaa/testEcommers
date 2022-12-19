import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

interface IProps {
  className: string;
  featuredImage: { sourceUrl: string };
  info: { pathname: string };
}

const FeaturedProduct = ({ className, featuredImage, info }: IProps) => {
  return (
    <Link
      href={info.pathname}
      className={clsx('ft-product flex img-wrap items-center', className)}
    >
      <Image src={featuredImage.sourceUrl} alt="" fill />
    </Link>
  );
};

export default FeaturedProduct;
