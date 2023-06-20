import Button from 'ui/Button';
import Form from 'ui/Form';
import Ebarimt from './Ebarimt';
import AddAddress from 'components/checkout/address/AddAddress';
import AddressList from './AddressList';
import Grid from 'components/checkout/layout/Grid';
import ScrollWrapper from 'components/header/Wrapper';
import Summary from 'components/checkout/summary';
import { useQuery, useMutation } from '@apollo/client';
import { queries } from './graphql';
import Loading from 'ui/Loading';
import useHandleOrder from 'lib/useHandleOrder';
import { useRouter } from 'next/router';
import { useCurrentOrder, useCurrentUser } from 'modules/appContext';
import FormItem from 'ui/FormItem';
import { mutations, queries as authQueries } from 'modules/auth/graphql';
import { toast } from 'react-toastify';

const AddressForm = () => {
  const router = useRouter();
  const { data, loading } = useQuery(queries.addresses);

  const [changePhone] = useMutation(mutations.changePhone, {
    refetchQueries: [
      { query: authQueries.currentUser },
      'clientPortalCurrentUser',
    ],
    onError(error) {
      toast.error(error.message);
    },
  });

  const { addresses } = data?.clientPortalCurrentUser?.customer || {};
  const onCompleted = (data: any) =>
    router.push({
      pathname: `/profile/orders/detail`,
      query: { id: data._id },
    });
  const { handleOrder, loading: loadingAction } = useHandleOrder(onCompleted);
  const { currentOrder } = useCurrentOrder();
  const { currentUser } = useCurrentUser();

  const onSubmit = (data) => {
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
      email,
      phone,
      firstName,
      lastName,
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
        saveInfo: true,
        email,
        phone,
        firstName,
        lastName,
      };
    }

    if (deliveryInfo === 'skip') {
      sendData.type = 'take';
    }

    const address = addresses?.find((address) => address?.id === deliveryInfo);

    if (address) {
      const { id, location, short } = address || {};
      sendData.deliveryInfo = {
        id,
        address: address?.address,
        marker: location?.coordinates,
        description: short,
        email,
        phone,
        firstName,
        lastName,
      };
    }

    if (phone && !currentUser?.phone) {
      changePhone({
        variables: {
          _id: currentUser?._id,
          phone: phone,
        },
      });
    }

    return handleOrder(sendData);
  };

  if (loading) return <Loading />;

  const { billType, registerNumber, deliveryInfo } = currentOrder || {};
  const { email, phone, firstName, lastName } = currentUser || {};

  return (
    <Form
      handleSubmit={onSubmit}
      className="order-address "
      args={{
        defaultValues: {
          deliveryInfo:
            addresses.find((address) => address.id === (deliveryInfo || {}).id)
              ?.id || 'add',
          isCompany: billType === '3',
          registerNumber,
          email: deliveryInfo?.email || email,
          phone: deliveryInfo?.phone || phone,
          firstName: deliveryInfo?.firstName || firstName,
          lastName: deliveryInfo?.lastName || lastName,
          ...(deliveryInfo?.address || {}),
          marker: deliveryInfo?.marker,
        },
      }}
    >
      <Grid
        side={
          <ScrollWrapper className="mx-md-3 order-summary scroll">
            <Summary />
            <Button
              className="w-full p-3 sum-buy"
              type="submit"
              loading={loadingAction}
            >
              Төлбөр төлөх
            </Button>
          </ScrollWrapper>
        }
      >
        <div className="row mx--2 pb-2">
          <div className="col-md-6 col-12 px-2 ">
            <FormItem
              label="Захиалагчийн нэр"
              placeholder="Бат-эрдэнэ"
              name="firstName"
              required
              min="8"
            />
          </div>
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн Овог"
              placeholder="Хашбат"
              name="lastName"
            />
          </div>
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн утасны дугаар"
              placeholder="99999999"
              name="phone"
              type="number"
              validate={{ pattern: /\d{8}/ }}
              errorMsgs={{
                pattern: 'Зөв утасны дугаар оруулана уу',
              }}
            />
          </div>
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн и-мэйл хаяг"
              placeholder="example@example.com"
              name="email"
            />
          </div>
        </div>
        <Ebarimt />
        <AddressList addresses={addresses} />
        <AddAddress />
      </Grid>
    </Form>
  );
};

export default AddressForm;
