import LottieView from 'ui/Lottie';
import { HTMLAttributes } from 'react';
import clsx from 'clsx';

const Empty = ({
  size,
  message = 'Хоосон байна',
  className,
  ...rest
}: HTMLAttributes<HTMLDivElement> & {
  size?: string;
  message?: string;
}) => {
  return (
    <div className={clsx('my-5 py-3', className)} {...rest}>
      <LottieView
        path="https://assets2.lottiefiles.com/packages/lf20_ry4iluja.json"
        className="empty mx-auto"
        size={size}
      />
      <b className="my-3 sbt block">{message}</b>
    </div>
  );
};

export default Empty;
