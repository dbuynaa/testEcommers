import Breadcrumb from 'components/ProductDetail/BreadCrumb';
import Context from 'components/ProductDetail/Context';
import ImageGallery from 'components/ProductDetail/Images';

import LastViewedItems from 'modules/Products/LastViewedItems';
import { useWholeSaleProductDetail } from 'modules/appContext';
// import WholeInfo from 'modules/wholeSale/components/WholeInfo';
import WholeInfoContainer from 'modules/wholeSale/containers/WholeInfo';
import WholeProductDetailContainer from 'modules/wholeSale/containers/WholeProductDetail';

// import { useRouter } from 'next/router';

const Detail = () => {
  const { wholeSaleProductDetail } = useWholeSaleProductDetail();
  console.log('wholeSaleProductDetail', wholeSaleProductDetail);
  return (
    <div className="mt-7">
      <Context>
        <div className="container prDtl ">
          <Breadcrumb />
          {/* <WholeInfo productId={productId} /> */}
          <WholeProductDetailContainer />
          <div className="row pb-4">
            <div className="col-12 col-md-6">
              <ImageGallery />
            </div>
            {/* wholeSaleProductDetail dotor pricing detail iin medeelel bga teriigee WholeInfoContainer ruu damjuulna */}

            <WholeInfoContainer/>
          </div>
        </div>

        <LastViewedItems category="" />
      </Context>
    </div>
  );
};

export default Detail;
//"{"__typename":"PoscProduct","_id":"Rz7DH7jHdXxQRd8Za","name":"OnePlus 11 8+128GB","code":"1-01-017-AAA-00","unitPrice":3590000,"remainder":7,"createdAt":"2023-05-17T08:12:43.016Z","attachment":{"__typename":"Attachment","url":"http://plugin-core-api/read-file?key=0.6981180019416582Oneplus-11.png"},"productDetail":{"__typename":"PricingPlan","status":"active","name":"buundii","_id":"FPvTuZ6brT8YDe4BR","createdAt":"2023-07-18T14:44:23.981Z","createdBy":"cAaFQYLXAQBxFywFg","updatedAt":"2023-07-18T14:44:23.981Z","updatedBy":"cAaFQYLXAQBxFywFg","createdUser":{"__typename":"User","details":{"__typename":"UserDetailsType","fullName":"Munkhtsetseg Urtnasan"}},"updatedUser":{"__typename":"User","details":{"__typename":"UserDetailsType","fullName":"Munkhtsetseg Urtnasan"}},"products":["Rz7DH7jHdXxQRd8Za"],"productsBundle":[],"categories":[],"isEndDateEnabled":true,"startDate":"2023-07-18T16:00:00.000Z","endDate":"2023-07-30T16:00:00.000Z"},"endDate":"2023-07-30T16:00:00.000Z"}"

// export const getStaticProps = async () => {
//   console.log("PROPS");
//   return {
//     props: {
//       data:
//     },
//   };
// };

// export const getStaticProps = async () => {
//   console.log("PROPS");

//   return { props: { data: "oldsoon" } };
// };
