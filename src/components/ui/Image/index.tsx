import { useState, FC, memo, useEffect } from 'react';
import NextImage, { ImageProps } from 'next/image';
import cls from 'classnames';
import { readFile } from 'utils';
import Logo from 'icons/logo';

const Image: FC<
  ImageProps & {
    src?: string;
    alt?: string;
    fallBack?: string;
    withLoader?: boolean;
    contain?: boolean;
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
    withLoader,
    sizes,
    className,
    contain,
    ...rest
  } = props;
  const fixedSrc = readFile(src || '');
  const [isImageLoading, setIsImageLoading] = useState(withLoader);
  const [srcI, setSrcI] = useState(fixedSrc || fallBack || '/product.png');
  const handleComplete = () => setIsImageLoading(false);

  useEffect(() => {
    const fixedSrc = readFile(src || '');
    setSrcI(fixedSrc);
  }, [src]);

  const updatedProps = {
    ...rest,
    src: srcI,
    alt,
    fill: !width && !height ? true : undefined,
    width,
    height,
    onError
  };

  if (srcI === '/product.png') return <Logo />;

  return (
    <NextImage
      {...updatedProps}
      loader={cloudflareLoader}
      onLoadingComplete={handleComplete}
      className={cls(
        'next-image',
        className,
        isImageLoading
          ? 'skelton-wave next-image-loading'
          : 'next-image-completed',
        contain ? 'object-contain' : 'object-contain'
      )}
      sizes={
        sizes ||
        `(max-width: 768px) 100vw,
  (max-width: 1200px) 50vw,
  33vw`
      }
    />
  );
};

export function cloudflareLoader({ src, width, quality }) {
  const params = [`width=${width}`, `quality=${quality || 75}`, 'format=auto'];
  return `https://erxes.io/cdn-cgi/image/${params.join(',')}/${src}`;
}

//xos.techstore.mn/gateway/read-file?key=0.021508049013006180.51531201349981501.png
const normalizeSrc = (src) => {
  return src.startsWith('/') ? process.env.NEXT_PUBLIC_DOMAIN + src : src;
};

export default memo(Image);
