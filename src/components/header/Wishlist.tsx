import HeartButton from 'icons/HeartButton';
import { useCurrentUser } from 'modules/appContext';
import Link from 'next/link';
import React from 'react';

const Wishlist = () => {
  const { currentUser } = useCurrentUser();

  const url = currentUser ? '/profile/wishlist' : '/auth/login';
  return (
    <Link href={url}>
      <div className="wishlist-btn">
        <HeartButton />
      </div>
    </Link>
  );
};

export default Wishlist;
