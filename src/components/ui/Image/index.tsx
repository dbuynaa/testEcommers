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
    // onError = () => setSrcI(props.fallBack || '/product.png'),
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
    // onError
  };

  if (srcI === '/product.png') return <Logo />;

  console.log(cloudflareLoader);

  return (
    <NextImage
      {...updatedProps}
      // loader={
      //   process.env.NEXT_PUBLIC_MODE === 'dev' ? undefined : cloudflareLoader
      // }
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

export const cloudflareLoader = ({
  src,
  width,
  quality,
}: {
  src?: string | null;
  width?: number;
  quality?: number;
}) => {
  const params = [`format=avif`];

  if (width) {
    params.push(`width=${width}`);
  }
  if (quality) {
    params.push(`quality=${quality}`);
  }

  const paramsString = params.join(',');
  return `https://erxes.io/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};

//xos.techstore.mn/gateway/read-file?key=0.021508049013006180.51531201349981501.png
const normalizeSrc = (src) => {
  console.log(
    src,
    process.env.NEXT_PUBLIC_DOMAIN + src,
    process.env.NEXT_PUBLIC_ERXES_API_URL + '/read-file?key=' + src,
    src.replace('http://plugin-core-api', process.env.NEXT_PUBLIC_ERXES_API_URL)
  );
  if (src.startsWith('/')) return process.env.NEXT_PUBLIC_DOMAIN + src;

  if (!src.includes('http'))
    return process.env.NEXT_PUBLIC_ERXES_API_URL + '/read-file?key=' + src;

  if (!src.includes('http://plugin-core-api')) return src;

  return src.replace(
    'http://plugin-core-api',
    process.env.NEXT_PUBLIC_ERXES_API_URL
  );
};

export default memo(Image);
