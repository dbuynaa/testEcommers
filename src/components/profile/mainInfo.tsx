import Image from 'next/image';

const MainInfo = () => {
  return (
    <div className="flex items-center justify-center profile-main p-2">
      <Image
        src="/profile.jpeg"
        alt="profile"
        width={44}
        height={44}
        className="circle"
        quality={100}
      />

      <div className="-content ps-3 ">
        <b className="sbt block">Бат-Эрдэнэ</b>
        <small className="text-mid-gray">hashbaterdene@gmail.com</small>
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
