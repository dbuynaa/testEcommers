import Image from 'next/image';

const normalizeSrc = (src) => {
  console.log(src, 'rr');
  return src.startsWith('/') ? src.slice(1) : src;
};

export const cloudflareLoader = ({ src, width, quality }) => {
  console.log(src, 'src', width, 'width', quality, 'quality');
  const params = [`width=${width}`, `format=avif`];
  if (quality) {
    params.push(`quality=${quality}`);
  }
  const paramsString = params.join(',');
  return `https://erxes.io/cdn-cgi/image/${paramsString}/${normalizeSrc(src)}`;
};

const MyImage = (props) => {
  return (
    <Image
      loader={cloudflareLoader}
      src="/me.png"
      alt="Picture of the author"
      width={500}
      height={500}
    />
  );
};
