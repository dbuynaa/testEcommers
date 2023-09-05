import { useQuery } from '@apollo/client';
import { queries } from 'modules/checkout/graphql';
import OrderStatus from 'components/profile/orderStatus';
import LoadingDots from 'ui/LoadingDots';
import NoData from 'icons/Robot';
import { toast } from 'react-toastify';
import PaymentBtn from 'components/profile/PaymentBtn';
import { useCurrentUser } from 'modules/appContext';
import Ebarimt from 'components/profile/Ebarimt';
import { useRouter } from 'next/router';
import OrderEnd from 'modules/checkout/OrderEnd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Summary from 'components/checkout/summary';
import ChevronLeft from 'icons/ChevronLeft';

const AddressConfirm = () => {
  const router = useRouter();
  const { id } = router.query;
  const { currentUser } = useCurrentUser();
  const [isAfter3s, setisAfter3s] = useState(false);

  const { loading, data, refetch } = useQuery(queries.orderDetail, {
    variables: {
      id,
      customerId: (currentUser || {}).erxesCustomerId,
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const { orderDetail } = data || {};

  const { paidDate, status, totalAmount, deliveryInfo, items, putResponses } = orderDetail || {};

  const { firstName, lastName, phone, email, address, marker, description } = deliveryInfo || {};

  const { city, city_district, street } = address || {};

  const { lng, lat } = marker || {};

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (paidDate) {
        setisAfter3s(dayjs(paidDate).isAfter(dayjs().subtract(3, 'second')));
      }
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

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

  return (
    <div className="confirm-page">
      <div className="row">
        <div className="col-12 col-md-8">
          {(!!address || !!marker || !!description) && (
            <div className="section my-4">
              <h6>Хүргэлтийн мэдээлэл</h6>

              <div className="row pt-3">
                {!!address && (
                  <>
                    <div className="col-12 col-md-4">
                      <small className="text-mid-gray">Хот/аймаг</small>
                      <big className="block">{city}</big>
                    </div>
                    <div className="col-4">
                      <small className="text-mid-gray">Дүүрэг</small>
                      <big className="block">{city_district}</big>
                    </div>
                    <div className="col-4">
                      <small className="text-mid-gray">Хороо/баг</small>
                      <big className="block">{street}</big>
                    </div>
                  </>
                )}
                {marker && (
                  <div className="col-12 pt-3">
                    <small className="text-mid-gray">GPS координат</small>
                    <big className="block">
                      {lng}, {lat}
                    </big>
                  </div>
                )}
                {description && (
                  <div className="col-12 pt-3">
                    <small className="text-mid-gray">Дэлгэрэнгүй</small>
                    <big className="block">{description}</big>
                  </div>
                )}
              </div>
            </div>
          )}
          {(firstName || lastName || phone || email) && (
            <div className="section my-4">
              <h6>Захиалагчийн мэдээлэл</h6>
              <div className="row justify-between pt-3 -">
                {lastName && (
                  <div>
                    <small className="text-mid-gray">Oвог</small>
                    <big className="block">{lastName}</big>
                  </div>
                )}
                {firstName && (
                  <div>
                    <small className="text-mid-gray">Нэр</small>
                    <big className="block">{firstName}</big>
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
            </div>
          )}
        </div>
        <div className="col-12 col-md-4">
          <div className="mx-3 mt-4">
            <Summary />
          </div>
          <div className="row items-center order-detail-actions mt-3 mx-3 ">
            <OrderStatus status={status} paidDate={paidDate} />
            <div className="grid grid-cols-2 gap-4 w-full my-3">
              {paidDate && <Ebarimt putResponses={putResponses} />}
              {status === 'new' && !paidDate && <OrderEnd refetch={refetch} />}
            </div>
            {((status !== 'pending' && !paidDate) || isAfter3s) && <PaymentBtn orderDetail={orderDetail} refetch={refetch} />}
          </div>
          <div className="order-back">
            <ChevronLeft />
            <span onClick={() => router.push('/checkout/address')}> Өмнөх алхамруу буцах</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddressConfirm;
