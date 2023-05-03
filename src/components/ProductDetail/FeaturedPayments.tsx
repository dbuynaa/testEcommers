import FeaturedPayment from './FeaturedPayment';
import Storepay from './Storepay';

const FeaturedPayments = () => {
  return (
    <>
      <Storepay />
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
