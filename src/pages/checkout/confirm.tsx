import Layout from 'components/checkout/layout';
import AddressForm from 'modules/checkout/AddressForm';

const Address = () => {
  return (
    <Layout>
      <big className="mb-2 block">
        <b>Захиалагчийн мэдээлэл</b>
      </big>
      <AddressForm />
    </Layout>
  );
};

export default Address;
