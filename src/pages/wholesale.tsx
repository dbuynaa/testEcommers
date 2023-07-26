/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

// import MainCategory from 'components/Products/MainCategory';

import Latest from 'components/home/Latest';
import Time from 'components/home/TimerCount';
import LastViewedItems from 'modules/Products/LastViewedItems';

const Wholesale = ({ wholeCategories }) => {
  return (
    <div className="flex flex-col wholesale py-10 px-12">
      <img src="/images/wholePhone.png" alt="pic" />
      <div className="flex py-16 items-center justify-center gap-12">
        <img src="/images/icons.png" alt="icons" />
      </div>
      <div className="container my-3 my-md-4 ">
        <h5 className="text-blue mb-2">Ширхэг барааг ч бөөний үнээр</h5>
      </div>
      <div className="relative">
        <div className="grid grid-cols-2"></div>
        <img
          src="/images/wholetimer.png"
          height={1299}
          width={1005}
          className=" relative"
        />
        <Time />
      </div>
      <div>
        <Latest />
      </div>
      <img src="/images/techstorebanner.png" alt="" className="py-24" />

      <div className="latest-slider">
        <LastViewedItems />
      </div>
    </div>
  );
};

export default Wholesale;
