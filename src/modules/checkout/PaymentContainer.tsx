import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { mutations, queries } from './graphql';
import { useConfig, useCurrentUser } from 'modules/appContext';
import { toast } from 'react-toastify';
import Loading from 'ui/Loading';
import { useEffect } from 'react';
import LottieView from 'ui/Lottie';

const PaymentContainer = ({
  totalAmount,
  orderId,
  phone,
  number,
  paidDate,
}: {
  totalAmount: string;
  orderId: string;
  phone: string;
  number: string;
  paidDate?: string;
}) => {
  const { config } = useConfig();
  const { currentUser } = useCurrentUser();

  const [generateInvoiceUrl, { loading, data }] = useMutation(
    mutations.generateInvoiceUrl,
    {
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const invoiceUrl = (data || {}).generateInvoiceUrl || '';

  const [makePayment, { loading: loadingMakePayment }] = useMutation(
    mutations.ordersMakePayment,
    {
      refetchQueries: [
        {
          query: queries.orderDetail,
        },
        'OrderDetail',
      ],
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const [getInvoices, { loading: loadingInvoices }] = useLazyQuery(
    gql(queries.invoices),
    {
      context: { headers: { 'erxes-app-token': (config || {}).erxesAppToken } },
      variables: {
        contentType: 'pos:orders',
        contentTypeId: orderId,
      },
      fetchPolicy: 'network-only',
      onCompleted(data) {
        const invoices = (data || {}).invoices || [];

        const paidAmount = invoices
          .filter(({ status }: any) => status === 'paid')
          .reduce((total: number, { amount }: any) => total + amount, 0);

        if (paidAmount >= totalAmount) {
          makePayment({
            variables: {
              id: orderId,
              doc: {
                mobileAmount: parseFloat(totalAmount),
              },
            },
          });
          return;
        }
        generateInvoiceUrl({
          variables: {
            amount: totalAmount,
            contentType: 'pos:orders',
            contentTypeId: orderId,
            customerId: currentUser?.erxesCustomerId
              ? currentUser?.erxesCustomerId
              : 'empty',
            customerType: 'customer',
            description: orderId + '-' + number,
            paymentIds: config.paymentIds,
            phone: phone || currentUser?.phone || '',
          },
        });
      },
    }
  );

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

  if (loading || loadingInvoices || loadingMakePayment)
    return <Loading className="payments" />;

  if (paidDate)
    return (
      <div className="flex justify-center items-center text-center flex-col">
        <h5 className="pb-4">
          Төлбөр амжилттай <br /> хийгдлээ
        </h5>
        <LottieView
          size={128}
          path={'https://assets9.lottiefiles.com/packages/lf20_lk80fpsm.json'}
        />
      </div>
    );

  return <iframe className="payments" src={invoiceUrl}></iframe>;
};

export default PaymentContainer;
