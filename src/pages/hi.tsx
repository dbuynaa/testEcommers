import { cloudflareLoader } from 'components/hoho';
import Image from 'next/image';

const Hi = () => {
  return (
    <div>
      <Image
        loader={cloudflareLoader}
        src="https://erxes.io/static/images/home/home5.png"
        alt="Picture of the author"
        width={500}
        height={500}
        className="object-cover"
        quality={100}
      />
    </div>
  );
};

export default Hi;
