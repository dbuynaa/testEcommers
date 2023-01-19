'use client';
import { toast } from 'react-toastify';
import { cleanCart } from 'utils';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useCurrentUser } from 'modules/appContext';
import Form from 'ui/Form';
import FormItem from 'ui/FormItem';
import Map from 'components/checkout/address/map';
import Layout from 'components/checkout/layout';
import Button from 'ui/Button';
import useOrderCU from 'lib/useOrderCU';
import useOrderData from 'lib/useOrderData';
import Ebarimt from 'modules/checkout/Ebarimt';
import type { AddressFormData } from 'modules/types';

const Address = () => {
  const router = useRouter();
  const orderData = useOrderData();
  const { currentUser } = useCurrentUser();
  const { cart, deliveryInfo, registerNumber, ...restData } = orderData;
  const onCompleted = (id: string) => router.push(`/profile/orders/${id}`);
  const { orderCU, loading } = useOrderCU(onCompleted);

  const { firstName, lastName, phone, email, description, marker, ...rest } =
    deliveryInfo as AddressFormData & {
      description: string;
      marker: {
        lat: string;
        lng: string;
      };
    };
  const [latLong, setLatLong] = useState<any>(marker);
  const formArgs = {
    defaultValues: {
      ...rest,
      firstName: firstName || currentUser?.firstName,
      lastName: lastName || currentUser?.lastName,
      phone: phone || currentUser?.phone,
      email: email || currentUser?.email,
      registerNumber: registerNumber || currentUser?.companyRegistrationNumber,
    },
  };

  useEffect(() => {
    if (orderData) {
      setLatLong(marker);
    }
  }, []);

  const onSubmit = (data: AddressFormData) => {
    const { registerNumber, ...rest } = data;
    return orderCU({
      variables: {
        ...restData,
        items: cleanCart(cart),
        registerNumber: registerNumber,
        deliveryInfo: {
          ...rest,
          marker: latLong,
          description: `Аймаг/Хот: ${data.province},  Сум/Дүүрэг: ${data.district}, Баг/Хороо: ${data.street}, Дэлгэрэнгүй: ${data.details} `,
        },
      },
    });
  };

  return (
    <Form args={formArgs} onSubmit={onSubmit}>
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
        <div className="row px-3 order-address">
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн нэр"
              placeholder="Бат-эрдэнэ"
              name="firstName"
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
            />
          </div>
          <div className="col-md-6 col-12 px-2">
            <FormItem
              label="Захиалагчийн и-мэйл хаяг"
              placeholder="example@example.com"
              name="email"
            />
          </div>
          <Ebarimt />
          <div className="col-md-4 col-12 px-2">
            <FormItem
              label="Хот/Aймаг"
              placeholder="Улаанбаатар"
              name="province"
            />
          </div>
          <div className="col-md-4 col-12 px-2">
            <FormItem
              label="Дүүрэг/сум"
              placeholder="Баянгол"
              name="district"
            />
          </div>
          <div className="col-md-4 col-12 px-2">
            <FormItem label="Хороо/баг" placeholder="6-хороо" name="street" />
          </div>
          <div className="col-12 px-2">
            <FormItem
              label="Дэлгэрэнгүй хаяг"
              placeholder="Алтан өргөө цогцолбор, Наран ундраа төв"
              element="textarea"
              name="details"
            />
          </div>
          <div className="form-item col-12">
            <label className="ps-3 block">Газрын зураг</label>
            <Map latLong={latLong} setLatLong={setLatLong} />
          </div>
        </div>
      </Layout>
    </Form>
  );
};

export default Address;
