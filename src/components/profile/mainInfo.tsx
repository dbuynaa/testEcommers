import Image from 'next/image';
import { useCurrentUser } from 'modules/appContext';

const MainInfo = () => {
  const { currentUser } = useCurrentUser();
  const { firstName, email, lastName } = currentUser || {};

  return (
    <div className="flex items-center justify-center profile-main p-2">
      <Image
        src="/images/profile.png"
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
      {/* <div className="text-mid-gray py-1 ps-3 -content">
        <div className="flex items-center justify-between w-100">
          <div>
            <small className="bold">Tech user I</small>
          </div>
          <div>
            <small>
              <b>3600</b> techpoint
            </small>
          </div>
        </div>
        <div className="container-progress">
          <div className="done" style={{ width: '65%' }} />
        </div>
        <div className="flex items-center justify-between w-100">
          <small>Bronze tier</small>
          <small>
            <b>125</b>/500
          </small>
        </div>
      </div> */}
    </div>
  );
};

export default MainInfo;
