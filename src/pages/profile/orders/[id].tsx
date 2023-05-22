import { useQuery } from '@apollo/client';
import { queries } from 'modules/checkout/graphql';
import OrderStatus from 'components/profile/orderStatus';
import LoadingDots from 'ui/LoadingDots';
import NoData from 'icons/Robot';
import { toast } from 'react-toastify';
import Image from 'ui/Image';
import PaymentBtn from 'components/profile/PaymentBtn';
import { useCurrentUser } from 'modules/appContext';
import Ebarimt from 'components/profile/Ebarimt';
import Layout from 'components/profile/layout';
import { useRouter } from 'next/router';
import OrderDetailLayout from 'components/profile/OrderDetailLayout';
import { readFile } from 'utils';
import OrderEnd from 'modules/checkout/OrderEnd';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useCurrentUser();

  const { loading, data, refetch } = useQuery(queries.orderDetail, {
    variables: {
      id,
      customerId: (currentUser || {}).erxesCustomerId,
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  if (loading)
    return (
      <div className="p-5 m-5">
        <div className="p-5 m-5 flex justify-center">
          <LoadingDots />
        </div>
      </div>
    );

  if (!(data || {}).orderDetail)
    return (
      <div className="p-5 m-5">
        <div className="p-5 m-5 flex justify-center">
          <NoData />
        </div>
      </div>
    );

  const { orderDetail } = data;

  const {
    paidDate,
    status,
    totalAmount,
    deliveryInfo,
    items,
    putResponses,
    number,
  } = orderDetail || {};

  const {
    firstName,
    lastName,
    phone,
    email,
    province,
    district,
    street,
    details,
  } = deliveryInfo || {};

  const isSettled = (putResponses || []).length > 0;

  return (
    <>
      <div className="row items-center order-detail-actions mt-3 ">
        <OrderStatus status={status} paidDate={paidDate} />
        <div className="row items-center py-3">
          {isSettled && <Ebarimt putResponses={putResponses} />}
          {status === 'new' && !isSettled && (
            <>
              <PaymentBtn
                totalAmount={totalAmount}
                orderId={id + ''}
                phone={phone}
                number={number}
              />
              <OrderEnd refetch={refetch} />
            </>
          )}
        </div>
      </div>

      {(province || district || street || details) && (
        <b className="block my-4">
          <big className="">
            <b>Хүргэлтийн мэдээлэл</b>
          </big>
          <div className="row pt-3">
            {province && (
              <div className="col-12 col-md-4">
                <small className="text-mid-gray">Хот/аймаг</small>
                <big className="block">{province}</big>
              </div>
            )}
            {district && (
              <div className="col-4">
                <small className="text-mid-gray">Дүүрэг</small>
                <big className="block">{district}</big>
              </div>
            )}
            {street && (
              <div className="col-4">
                <small className="text-mid-gray">Хороо/баг</small>
                <big className="block">{street}</big>
              </div>
            )}
            {details && (
              <div className="col-12 pt-3">
                <small className="text-mid-gray">Дэлгэрэнгүй</small>
                <big className="block">{details}</big>
              </div>
            )}
          </div>
        </b>
      )}
      {(firstName || lastName || phone || email) && (
        <b className="block my-4">
          <big className="">
            <b>Захиалагчийн мэдээлэл</b>
          </big>
          <div className="row justify-between pt-3 -">
            {firstName && (
              <div>
                <small className="text-mid-gray">Нэр</small>
                <big className="block">{firstName}</big>
              </div>
            )}
            {lastName && (
              <div>
                <small className="text-mid-gray">Oвог</small>
                <big className="block">{lastName}</big>
              </div>
            )}
            {phone && (
              <div>
                <small className="text-mid-gray">Утас</small>
                <big className="block">{phone}</big>
              </div>
            )}
            {email && (
              <div>
                <small className="text-mid-gray">Имэйл</small>
                <big className="block">{email}</big>
              </div>
            )}
          </div>
        </b>
      )}
      <div className="block mt-3">
        <big>
          <b>Таны захиалсан бараанууд</b>
        </big>
        {(items || []).map(
          (
            { productName, unitPrice, count, productId, productImgUrl }: any,
            idx: number
          ) => (
            <div className="flex py-3 order-product" key={idx}>
              <div className="img-wrap">
                <Image src={readFile(productImgUrl)} alt="" sizes="20vw" />
              </div>
              <div className="row items-center justify-between ps-3">
                <div className="order-product-name ">
                  <small className="text-mid-gray block">{productId}</small>
                  <big>{productName}</big>
                </div>
                <div className="flex items-center">
                  {unitPrice.toLocaleString()} ₮
                  <div className="mx-3 px-2 rounded order-product-count">
                    x{count}
                  </div>
                  <b>{(unitPrice * count).toLocaleString()} ₮</b>
                </div>
              </div>
            </div>
          )
        )}
        <big className="flex justify-between py-3">
          <b>Нийт</b>
          <b>{totalAmount.toLocaleString()}₮</b>
        </big>
      </div>
    </>
  );
};

Page.getLayout = (page: any) => (
  <Layout>
    <OrderDetailLayout>{page}</OrderDetailLayout>
  </Layout>
);

export default Page;
