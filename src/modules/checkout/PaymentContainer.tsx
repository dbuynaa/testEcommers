import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { mutations, queries } from './graphql';
import { useConfig, useCurrentUser } from 'modules/appContext';
import { toast } from 'react-toastify';
import Loading from 'ui/Loading';
import { useEffect } from 'react';
import LottieView from 'ui/Lottie';

const PaymentContainer = ({ orderDetail, refetch }: { orderDetail: any; refetch: any }) => {
  const { billType, registerNumber, _id: orderId, totalAmount, number, paidDate } = orderDetail || {};
  const { config } = useConfig();
  const { currentUser } = useCurrentUser();

  const [generateInvoiceUrl, { loading, data }] = useMutation(mutations.generateInvoiceUrl, {
    onError(error) {
      toast.error(error.message);
    },
  });

  const invoiceUrl = (data || {}).generateInvoiceUrl || '';

  const [settlePayment, { loading: loadingSettlement }] = useMutation(mutations.ordersSettlePayment, {
    refetchQueries: [
      {
        query: queries.lastOrder,
      },
      'LastOrder',
    ],
    onError(error) {
      toast.error(error.message);
    },
    onCompleted(data) {
      refetch();
    },
  });

  const [addPayment, { loading: loadingAddPayment }] = useMutation(mutations.ordersAddPayment, {
    onCompleted() {
      settlePayment({
        variables: {
          billType: billType,
          registerNumber,
          _id: orderId,
        },
      });
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const [getInvoices, { loading: loadingInvoices }] = useLazyQuery(gql(queries.invoices), {
    context: { headers: { 'erxes-app-token': (config || {}).erxesAppToken } },
    variables: {
      contentType: 'pos:orders',
      contentTypeId: orderId,
    },
    fetchPolicy: 'network-only',
    onCompleted(data) {
      const invoices = (data || {}).invoices || [];

      const paidAmount = invoices.filter(({ status }: any) => status === 'paid').reduce((total: number, { amount }: any) => total + amount, 0);

      if (paidAmount >= totalAmount) {
        !paidDate &&
          addPayment({
            variables: {
              _id: orderId,
              mobileAmount: parseFloat(totalAmount),
            },
          });
        return;
      }
      generateInvoiceUrl({
        variables: {
          amount: totalAmount,
          contentType: 'pos:orders',
          contentTypeId: orderId,
          customerId: currentUser?.erxesCustomerId ? currentUser?.erxesCustomerId : 'empty',
          customerType: 'customer',
          description: orderId + '-' + number,
          paymentIds: config.paymentIds,
        },
      });
    },
  });

  useEffect(() => {
    window.addEventListener('message', (event) => {
      const { message, fromPayment } = event.data;
      if (fromPayment) {
        if (message === 'paymentSuccessfull') {
          getInvoices();
        }
      }
    });

    getInvoices();

    return removeEventListener('message', () => {});
  }, []);

  if (loading || loadingInvoices || loadingAddPayment || loadingSettlement) return <Loading className="payments" />;

  if (paidDate)
    return (
      <div className="flex justify-center items-center text-center flex-col">
        <h5 className="pb-4">
          Төлбөр амжилттай <br /> хийгдлээ
        </h5>
        <LottieView size={128} path={'https://assets9.lottiefiles.com/packages/lf20_lk80fpsm.json'} />
      </div>
    );

  return (
    <>
      <iframe className="payments" src={invoiceUrl}></iframe>
    </>
  );
};

export default PaymentContainer;
