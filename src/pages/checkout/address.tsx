import Layout from 'components/checkout/layout';
import PrivateRoute from 'modules/auth/privateRoute';
import Grid from 'components/checkout/layout/Grid';
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

Address.getLayout = (page) => <PrivateRoute>{page}</PrivateRoute>;

export default Address;
