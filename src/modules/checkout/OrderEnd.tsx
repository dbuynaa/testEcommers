import Button from 'ui/Button';
import Modal from 'ui/Modal';
import ErxesForm from 'ui/ErxesForm';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const OrderEnd = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [changeStatus, { loading }] = useMutation(mutations.orderChangeStatus, {
    variables: {
      _id: id,
      status: 'pending',
    },
    refetchQueries: [
      { query: queries.orderDetail },
      { query: queries.lastOrder },
    ],
    onError(error) {
      toast.error(error.message);
    },
  });
  const handleLeasing = () => {
    changeStatus();
    router.push('/leasing');
  };

  const handleAfterPay = () => {
    changeStatus();
    setOpen(true);
  };

  return (
    <>
      <Button
        className="-pay-btn mx-2"
        variant="slim"
        loading={loading}
        onClick={handleLeasing}
      >
        Зээлээр авах
      </Button>
      <Button
        variant="slim"
        className="-pay-btn"
        loading={loading}
        onClick={handleAfterPay}
      >
        Дараа төлөх
      </Button>
      <Modal onOpenChange={() => setOpen((prev) => !prev)}>
        <div className="order-end-modal">
          <ErxesForm brandId="NMoDpG" formId="ep5mM9" />
        </div>
      </Modal>
    </>
  );
};

export default OrderEnd;
