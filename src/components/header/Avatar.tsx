import React from 'react';

import Image from 'ui/Image';
import { useCurrentUser } from 'modules/appContext';


const Avatar = () => {
  const { currentUser } = useCurrentUser();
  const { firstName, email, lastName, avatar } = currentUser || {};
  return (
    <div className="flex items-center profile-main p-2">
      <Image
        src={currentUser?.avatar || '/images/user.png'}
        alt="profile"
        width={44}
        height={44}
        className="circle"
        quality={100}
      />
  
      <div className="-content ps-3 ">
        <b className="sbt block">
          {firstName} {(lastName || '').split('')[0]}.
        </b>
        <small className="text-mid-gray">{email}</small>
      </div>
    </div>
  );
};

export default Avatar;
