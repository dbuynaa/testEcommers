'use client';
import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { mutations, queries } from './graphql';
import { useConfig, useCurrentUser } from 'modules/appContext';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
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
    gql(mutations.generateInvoiceUrl),
    {
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  const invoiceUrl = (data || {}).generateInvoiceUrl || '';

  const [addPayment, { loading: loadingAdd }] = useMutation(
    mutations.ordersAddPayment,
    {
      refetchQueries: [
        {
          query: queries.orderDetail,
        },
        'orderDetail',
      ],
      onError(error) {
        toast.error(error.message);
      },
      onCompleted() {},
    }
  );

  const [getInvoices, { loading: loadingInvoices }] = useLazyQuery(
    gql(queries.invoices),
    {
      context: { headers: { 'erxes-app-token': config.erxesAppToken } },
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

        if (paidAmount === totalAmount) {
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
            customerId: currentUser?.erxesCustomerId
              ? currentUser?.erxesCustomerId
              : 'empty',
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

  if (loading || loadingInvoices || loadingAdd)
    return <Loading className="min-height-screen" />;

  return (
    <div className="row">
      <iframe className="min-height-screen col-12" src={invoiceUrl}></iframe>
    </div>
  );
};

export default PaymentContainer;
