import Layout from 'components/checkout/layout';
import AddressConfirm from 'modules/checkout/AddressConfirm';

const Address = () => {
  return (
    <Layout>
      <big className="block">
        <b>Баталгаажуулах</b>
      </big>
      <AddressConfirm />
    </Layout>
  );
};

export default Address;
