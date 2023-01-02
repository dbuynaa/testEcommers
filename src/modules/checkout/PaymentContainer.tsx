import { useMutation, gql, useLazyQuery } from '@apollo/client';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';

const PaymentContainer = () => {
  const [generateInvoiceUrl, { loading, data }] = useMutation(
    gql(mutations.generateInvoiceUrl),
    {
      onError(error) {
        toast.error(error.message);
      },
    }
  );

  return <div>Enter</div>;
};

export default PaymentContainer;
