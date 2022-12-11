import { useState, FC, memo } from 'react';
import NextImage, { ImageProps } from 'next/image';
import cls from 'classnames';
import { readFile } from 'utils';
import Logo from 'icons/logo';

const Image: FC<
  ImageProps & {
    src?: string;
    alt?: string;
    fallBack?: string;
    noWrap?: boolean;
    withLoader?: boolean;
  }
> = (props) => {
  const {
    src,
    fill = true,
    alt = '',
    onError = () => setSrcI(props.fallBack || '/product.png'),
    width,
    height,
    fallBack,
    noWrap,
    withLoader,
    ...rest
  } = props;
  const fixedSrc = readFile(src || '');
  const [isImageLoading, setIsImageLoading] = useState(withLoader);
  const [srcI, setSrcI] = useState(fixedSrc || fallBack || '/product.png');
  const handleComplete = () => setIsImageLoading(false);

  const updatedProps = {
    ...rest,
    src: srcI,
    alt,
    fill: !width && !height ? true : undefined,
    width,
    height,
    onError,
  };

  const renderImage = () => (
    <NextImage
      {...updatedProps}
      onLoadingComplete={handleComplete}
      className={cls(
        'next-image',
        isImageLoading
          ? 'skelton-wave next-image-loading'
          : 'next-image-completed'
      )}
      sizes="(max-width: 768px) 100vw,
      (max-width: 1200px) 50vw,
      33vw"
    />
  );

  if (srcI === '/product.png')
    return noWrap ? (
      <Logo />
    ) : (
      <div className="img-wrap flex items-center justify-center">
        <Logo />
      </div>
    );

  return noWrap ? (
    renderImage()
  ) : (
    <div className="img-wrap">{renderImage()}</div>
  );
};

export default memo(Image);
