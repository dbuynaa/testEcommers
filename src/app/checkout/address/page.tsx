'use client';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { cleanCart } from 'utils';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useCurrentUser } from 'modules/appContext';
import FormItem from 'ui/FormItem';
import Map from 'components/checkout/address/map';
import Layout from 'components/checkout/layout';
import Button from 'ui/Button';
import useOrderCU from 'lib/useOrderCU';
import useOrderData from 'lib/useOrderData';

type FormData = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  province: string;
  district: string;
  street: string;
  details: string;
  map: string;
};

const Address = () => {
  const [latLong, setLatLong] = useState<any>();
  const orderData = useOrderData();
  const { currentUser } = useCurrentUser();
  const { cart, ...restData } = orderData;
  const router = useRouter();

  const onCompleted = () => router.push('/checkout/payment');

  const { orderCU, loading } = useOrderCU(onCompleted);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    if (latLong) {
      return orderCU({
        variables: {
          ...restData,
          items: cleanCart(cart),
          deliveryInfo: {
            ...data,
            marker: latLong,
            description: `Аймаг/Хот: ${data.province},  Сум/Дүүрэг: ${data.district}, Баг/Хороо: ${data.street}, Дэлгэрэнгүй: ${data.details} `,
          },
        },
      });
    }
    return toast.error('Газрын зураг дээр байршилаа сонгоно уу');
  });

  return (
    <form onSubmit={onSubmit}>
      <Layout
        action={
          <>
            <Button
              type="submit"
              className="sum-buy block w-full p-3"
              loading={loading}
            >
              Үргэлжлүүлэх
            </Button>
          </>
        }
      >
        <div className="row px-3 order-address">
          <div className="col-6 px-2">
            <FormItem
              label="Захиалагчийн нэр"
              placeholder="Бат-эрдэнэ"
              errorMsgs={{
                required: 'Заавал оруулана уу',
              }}
              errors={errors}
              {...register('firstName', {
                required: true,
              })}
            />
          </div>
          <div className="col-6 px-2">
            <FormItem
              label="Захиалагчийн Овог"
              placeholder="Хашбат"
              errorMsgs={{
                required: 'Заавал оруулана уу',
              }}
              errors={errors}
              {...register('lastName', {
                required: true,
              })}
            />
          </div>
          <div className="col-6 px-2">
            <FormItem
              label="Захиалагчийн утасны дугаар"
              placeholder="99999999"
              errorMsgs={{
                required: 'Заавал оруулана уу',
              }}
              errors={errors}
              {...register('phone', {
                required: true,
              })}
            />
          </div>
          <div className="col-6 px-2">
            <FormItem
              label="Захиалагчийн и-мэйл хаяг"
              placeholder="example@example.com"
              errorMsgs={{
                required: 'Заавал оруулана уу',
              }}
              errors={errors}
              {...register('email', {
                required: true,
              })}
            />
          </div>
          <div className="col-4 px-2">
            <FormItem
              label="Хот/Aймаг"
              placeholder="Улаанбаатар"
              errorMsgs={{
                required: 'Заавал оруулана уу',
              }}
              errors={errors}
              {...register('province', {
                required: true,
              })}
            />
          </div>
          <div className="col-4 px-2">
            <FormItem
              label="Дүүрэг/сум"
              placeholder="Баянгол"
              errorMsgs={{
                required: 'Заавал оруулана уу',
              }}
              errors={errors}
              {...register('district', {
                required: true,
              })}
            />
          </div>
          <div className="col-4 px-2">
            <FormItem
              label="Хороо/баг"
              placeholder="6-хороо"
              errorMsgs={{
                required: 'Заавал оруулана уу',
              }}
              errors={errors}
              {...register('street', {
                required: true,
              })}
            />
          </div>
          <div className="col-12 px-2">
            <FormItem
              label="Дэлгэрэнгүй хаяг"
              placeholder="Алтан өргөө цогцолбор, Наран ундраа төв"
              element="textarea"
              errorMsgs={{
                required: 'Заавал оруулана уу',
              }}
              errors={errors}
              {...register('details', {
                required: true,
              })}
            />
          </div>
          <div className="form-item col-12">
            <label className="ps-3 block">Газрын зураг</label>
            <Map latLong={latLong} setLatLong={setLatLong} />
          </div>
        </div>
      </Layout>
    </form>
  );
};

export default Address;
