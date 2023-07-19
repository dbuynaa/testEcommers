/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Latest from 'components/home/Latest';
import LastViewedItems from 'modules/Products/LastViewedItems';
import WholeSaleContainer from 'modules/wholeSale/containers/WholeSale';
const Wholesale = ({ categories }) => {
  return (
    <div className="flex flex-col wholesale container">
      <div className="flex "></div>

      <div className="container my-3 my-md-4 ">
        <h5 className="text-blue mb-2">Ширхэг барааг ч бөөний үнээр</h5>
      </div>

      <WholeSaleContainer />
      <div>
        <Latest />
      </div>
      <LastViewedItems category={''} className="latest-slider pt-3" />
    </div>
  );
};

export default Wholesale;
