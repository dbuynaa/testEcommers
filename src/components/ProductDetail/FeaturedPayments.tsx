import FeaturedPayment from './FeaturedPayment';

const FeaturedPayments = () => {
  return (
    <>
      <FeaturedPayment
        name="StorePay"
        image="/images/storepay.png"
        description="Storepay үйлчилгээг ашиглан төлбөрөө 4 хуваан төлөх боломжтой."
      />
      <FeaturedPayment
        name="Tech Leasing"
        image="/images/techleasing.png"
        description="Та зээлийн нөхцөлөөр энэхүү барааг авах боломжтой."
        Component="a"
        href="/leasing"
      />
    </>
  );
};

export default FeaturedPayments;
