import React from 'react';

import Image from 'ui/Image';
import { useCurrentUser } from 'modules/appContext';
import { readFile } from 'utils';

const Avatar = () => {
  const { currentUser } = useCurrentUser();
  const { firstName, email, lastName, avatar } = currentUser || {};

  return (
    <div className="flex items-center profile-main p-2">
      <Image
        src={!!avatar ? readFile(avatar) : '/images/user.png'}
        alt="profile"
        width={40}
        height={40}
        className="circle h-10 w-10"
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
