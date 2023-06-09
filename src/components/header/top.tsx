import Facebook from 'icons/Facebook';
import Instagram from 'icons/Instagram';
import Twitter from 'icons/Twitter';
// import Phone from 'icons/phone';
import Link from 'next/link';

const Top = () => {
  return (
    <div className="max-sm:hidden sm:hidden md:flex pt-3 pe-4 container  justify-between ">
      {/*
       */}
      <Link href="/" className="text-[12px]">
        Tech Store-д тавтай морилно уу
      </Link>
      <span className="text-[12px] text-[#febe0b]">
        {' '}
        Монгол улсын аль ч хэсэгт хүргэнэ.
      </span>
      <b className="flex justify-end gap-2 ">
        <Link href="https://www.facebook.com/TechstoreMongolia" target="_blank">
          <Facebook />
        </Link>
        <Link
          href="https://www.instagram.com/TechstoreMongolia"
          target="_blank"
        >
          <Instagram />
        </Link>
        <Link href="https://www.twitter.com/TechstoreMongolia" target="_blank">
          <Twitter />
        </Link>

        <Link className="flex items-center gap-1" href="tel:7510-3000">
          {/* <Phone /> */}
          <span className="text-[12px] ">7510-3000</span>
        </Link>
      </b>
    </div>
  );
};

export default Top;
