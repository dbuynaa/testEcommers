import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { mutations, queries } from './graphql';
import { useConfig, useCurrentUser } from 'modules/appContext';
import { toast } from 'react-toastify';
import Loading from 'ui/Loading';
import { useEffect } from 'react';

const PaymentContainer = ({
  totalAmount,
  orderId,
}: {
  totalAmount: string;
  orderId: string;
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

  console.log(config);

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
                cashAmount: parseFloat(totalAmount),
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
            description: orderId + '-' + '',
            paymentIds: config.paymentIds,
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
    return <Loading className="min-height-screen payments" />;

  return (
    <iframe className="min-height-screen payments" src={invoiceUrl}></iframe>
  );
};

export default PaymentContainer;
