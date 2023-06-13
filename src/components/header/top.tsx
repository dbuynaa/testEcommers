import { motion } from 'framer-motion';
import Facebook from 'icons/Facebook';
import Instagram from 'icons/Instagram';
import Twitter from 'icons/Twitter';
// import Phone from 'icons/phone';
import Link from 'next/link';

const Top = () => {
  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 'auto' }}
      exit={{ height: 0 }}
      className="overflow-hidden"
    >
      <div className="max-sm:hidden sm:hidden md:flex pt-3  container  justify-between font-medium">
        {/*
         */}
        <Link href="/" className="text-xs">
          Tech Store-д тавтай морилно уу
        </Link>
        <span className="text-xs text-[#febe0b]">
          Монгол улсын аль ч хэсэгт хүргэнэ.
        </span>
        <b className="flex justify-end gap-2 divide-x-2 divide-white">
          <div className="flex gap-2 px-2">
            <Link
              href="https://www.facebook.com/TechstoreMongolia"
              target="_blank"
            >
              <Facebook />
            </Link>
            <Link
              href="https://www.instagram.com/TechstoreMongolia"
              target="_blank"
              
            >
              <Instagram />
            </Link>
            <Link
              href="https://www.twitter.com/TechstoreMongolia"
              target="_blank"
            >
              <Twitter />
            </Link>
          </div>
          <Link className="flex items-center px-2" href="tel:7510-3000">
            {/* <Phone /> */}
            <span className="text-xs">7510-3000</span>
          </Link>
          <Link href="/branches" className="text-xs px-2">
            {' '}
            Салбарууд{' '}
          </Link>
        </b>
      </div>
    </motion.div>
  );
};

export default Top;
