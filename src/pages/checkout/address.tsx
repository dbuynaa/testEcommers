import Layout from 'components/checkout/layout';
import useHandleOrder from 'lib/useHandleOrder';
import Button from 'ui/Button';
import AddressContainer from 'modules/checkout/address';

const Address = () => {
  const { loading } = useHandleOrder();
  return (
    <Layout
      action={
        <>
          <Button
            type="submit"
            className="sum-buy  w-full p-3"
            loading={loading}
          >
            Үргэлжлүүлэх
          </Button>
        </>
      }
    >
      <AddressContainer />
    </Layout>
  );
};

export default Address;
