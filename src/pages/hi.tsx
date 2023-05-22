import { cloudflareLoader } from 'components/hoho';
import Image from 'next/image';

const Hi = () => {
  return (
    <div>
      <Image
        loader={cloudflareLoader}
        src="https://i.scdn.co/image/ab676186000010164fe31fa000745289be1f7514"
        alt="Picture of the author"
        width={500}
        height={500}
        className="object-cover"
        quality={10}
      />
    </div>
  );
};

export default Hi;
