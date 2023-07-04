import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton
  // FacebookMessengerShareButton,
} from 'next-share';
import Facebook from 'icons/Facebook';
import Twitter from 'icons/Twitter';
import { useDetailContext } from 'components/ProductDetail/Context';

const Share = () => {
  const { _id } = useDetailContext();
  const url = `${process.env.NEXT_PUBLIC_DOMAIN}/products/${_id}`;
  return (
    <div className="container c-md items-center justify-end flex gap-2 ">
      <FacebookShareButton url={url}>
        <Facebook />
      </FacebookShareButton>
      {/* <FacebookMessengerShareButton url={url} appId={'235931783264550'}>
        <Messenger />
      </FacebookMessengerShareButton> */}

      <TwitterShareButton url={url}>
        <Twitter />
      </TwitterShareButton>
    </div>
  );
};

export default Share;
