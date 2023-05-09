import Button from 'ui/Button';
import Form from 'ui/Form';
import Ebarimt from './Ebarimt';
import AddAddress from 'components/checkout/address/AddAddress';
import AddressList from './AddressList';
import Grid from 'components/checkout/layout/Grid';
import ScrollWrapper from 'components/header/Wrapper';
import Summary from 'components/checkout/summary';
import { useQuery } from '@apollo/client';
import { queries } from './graphql';
import Loading from 'ui/Loading';
import useHandleOrder from 'lib/useHandleOrder';
import { useRouter } from 'next/router';
import UserInfo from 'components/checkout/address/UserInfo';

const AddressForm = () => {
  const router = useRouter();
  const { data, loading } = useQuery(queries.addresses);
  const { addresses } = data?.customer || {};
  const onCompleted = (id: string) => router.push(`/profile/orders/${id}`);
  const { handleOrder, loading: loadingAction } = useHandleOrder(onCompleted);

  const onSubmit = (data) => {
    // companyName : "DEMO - MSM групп"//
    // deliveryInfo: "add"//
    // others : "Altanorgooo"//
    // city_district : "Bayangol"//
    // isCompany : true//
    // marker : {lat: 47.91687694759132, lng: 106.9062304655307}//
    // city : "Ulaanbaatar" //
    // registerNumber : "0000018" //
    // street : "6-horoo"//
    const {
      isCompany,
      registerNumber,
      companyName,
      deliveryInfo,
      others,
      street,
      city_district,
      city,
      marker,
    } = data;

    let sendData = {} as any;

    if (isCompany && companyName) {
      sendData.registerNumber = registerNumber;
      sendData.billType = '3';
    }

    if (deliveryInfo === 'add') {
      sendData.deliveryInfo = {
        address: {
          others,
          street,
          city_district,
          city,
        },
        marker,
        description: `Аймаг/Хот: ${city}, Сум/Дүүрэг: ${city_district}, Баг/Хороо: ${street}, Дэлгэрэнгүй: ${others}`,
        isNewAddress: true,
      };
    }

    if (deliveryInfo === 'skip') {
      sendData.type = 'take';
    }

    const address = addresses?.find(
      (address) => address?.short === deliveryInfo
    );

    if (address) {
      sendData.deliveryInfo = address;
    }

    return handleOrder(sendData);
  };

  if (loading) return <Loading />;

  return (
    <Form
      handleSubmit={onSubmit}
      className="order-address"
      args={{
        defaultValues: {
          deliveryInfo: 'add',
        },
      }}
    >
      <Grid
        side={
          <ScrollWrapper className="mx-md-3 order-summary scroll">
            <Summary />
            <Button className="block w-full p-3 sum-buy" type="submit">
              Төлбөр төлөх
            </Button>
          </ScrollWrapper>
        }
      >
        <Ebarimt />
        <AddressList addresses={addresses} />
        <AddAddress />
      </Grid>
    </Form>
  );
};

export default AddressForm;
