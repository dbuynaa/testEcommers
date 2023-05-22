import Image from 'next/image';

const normalizeSrc = (src) => {
  return src.startsWith('/') ? src.slice(1) : src;
};

export const cloudflareLoader = ({ src, width, quality }) => {
  const params = [`width=${width}`];
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
