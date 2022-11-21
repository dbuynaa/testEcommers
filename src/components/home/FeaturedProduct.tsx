import clsx from 'clsx';
import Image from 'next/image';

interface IProps {
  className: string;
  bgImg: string;
  title: string;
}

const FeaturedProduct = ({ className, bgImg, title }: IProps) => {
  return (
    <div className={clsx('ft-product flex img-wrap items-center', className)}>
      <Image src={bgImg} alt="" fill />
      <h5 className="p-4">{title}</h5>
    </div>
  );
};

export default FeaturedProduct;
