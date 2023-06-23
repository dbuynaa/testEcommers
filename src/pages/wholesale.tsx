/* eslint-disable @next/next/no-img-element */

import Latest from 'components/home/Latest';
import LastViewedItemsAdd from 'modules/Products/LastViewedItemsAdd';

const Wholesale = ({ productId }) => {
  return (
    <div className="flex flex-col wholesale py-10 px-12">
      <img src="/images/wholePhone.png" alt="pic" />
      <div className="flex py-16 items-center justify-center gap-12">
        <img src="/images/mixiaomi.png" />
        <img src="/images/oneplus.png" />
        <img src="/images/wholeicon.png" />

        <img src="/images/realme.png" />
      </div>
      <div className="container my-3 my-md-4 ">
        <h5 className="text-blue mb-2">Ширхэг барааг ч бөөний үнээр</h5>
      </div>
      <div className="">
        <div className="grid grid-cols-2"></div>
        <img src="/images/wholetimer.png" height={1006} width={1300} />
      </div>
      <div>
        <Latest />
      </div>
      <img src="/images/techstorebanner.png" alt="" className="py-24" />
      <LastViewedItemsAdd productId={productId} />
    </div>
  );
};

export default Wholesale;
