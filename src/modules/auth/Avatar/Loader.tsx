/* eslint-disable @next/next/no-img-element */
type Props = {
  full?: boolean;
};

const Loader = ({ full }: Props) => {
  return (
    <>
      <div className={full ? ' full loader' : 'loader'}>
        <div className="h-screen bg-white">
          <div className="flex justify-center items-center h-full">
            <img
              className="h-16 w-16"
              src="https://icons8.com/preloaders/preloaders/1488/Iphone-spinner-2.gif"
              alt=""
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
