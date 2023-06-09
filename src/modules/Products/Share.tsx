import React from 'react';

// import getProductIds from 'lib/getProductIds';
import {
  // eslint-disable-next-line unused-imports/no-unused-imports
  FacebookShareButton,
  // eslint-disable-next-line unused-imports/no-unused-imports
  TwitterShareButton,
  FacebookMessengerShareButton
} from 'next-share';
import Facebook from 'icons/Facebook';
import Twitter from 'icons/Twitter';
import Instagram from 'icons/Instagram';

const Share = ({ _id }) => {
  // const {_id}
  return (
    <div className="container c-md items-center justify-end flex gap-2 ">
      <FacebookShareButton
        url={`https://www.technews.mn/products/${_id}`}
        // quote={'next-share is a social share buttons for your next React apps.'}
        // hashtag={'#nextshare'}
      >
        <Facebook />
      </FacebookShareButton>
      <FacebookMessengerShareButton
        url={`https://www.technews.mn/products/${_id}`}
        appId={''}
      >
        <Instagram />
      </FacebookMessengerShareButton>

      <TwitterShareButton
        url={`https://www.technews.mn/products/${_id}`}
        title={'next-share is a social share buttons for your next React apps.'}
      >
        <Twitter />
      </TwitterShareButton>
    </div>
  );
};

export default Share;
