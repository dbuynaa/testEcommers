/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Latest from 'components/home/Latest';
import { getImgBanner } from 'lib/wp/posts';
import LastViewedItems from 'modules/Products/LastViewedItems';
import WholeBanner from 'modules/wholeSale/components/WholeBanner';
import WholeSaleContainer from 'modules/wholeSale/containers/WholeSale';
const Wholesale = ({ categories, imgBanners }) => {
  return (
    <div className="flex flex-col wholesale container">
      <div className="flex ">
        <WholeBanner imgBanners={imgBanners} />
      </div>

      <div className="container my-3 my-md-4 ">
        <h5 className="text-blue mb-2">Ширхэг барааг ч бөөний үнээр</h5>
      </div>

      <WholeSaleContainer />
      <div className="pt-5 pb-5">
        <Latest />
      </div>
      <LastViewedItems category={''} className="latest-slider pt-3" />
    </div>
  );
};

export default Wholesale;
export const getStaticProps = async () => {
  const { posts: imgBanners } = await getImgBanner();

  return {
    props: {
      imgBanners
    }
  };
};
// "data": {
//   "pricingPlanDetail": {
//     "_id": "b2d6p5tLCviMJdr6A",
//     "products": [
//       "Yo7rJkpYfj5Xo2mvA",
//       "WWGiLYGQBFw3MXENk"
//     ],
//     "categories": [],
//     "startDate": "2023-07-27T16:00:00.000Z",
//     "endDate": "2023-08-06T16:00:00.000Z",
//     "branchIds": [],
//     "status": "active",
//     "name": "tsagnii buundii",
//     "priceRules": [
//       {
//         "discountValue": 10,
//         "discountType": "fixed",
//         "value": 10,
//         "type": "minimum"
//       }
//     ],
//     "quantityRules": [
//       {
//         "type": "minimum",
//         "value": 10
//       }
//     ]
//   }
// }
// }