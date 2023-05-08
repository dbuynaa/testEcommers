import Button from 'ui/Button';
import Modal from 'ui/Modal';
import ErxesForm from 'ui/ErxesForm';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { mutations, queries } from './graphql';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const OrderEnd = ({ refetch }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const [changeStatus, { loading }] = useMutation(mutations.orderChangeStatus, {
    variables: {
      _id: id,
      status: 'pending',
    },
    refetchQueries: [{ query: queries.lastOrder }, 'LastOrder'],
    onError(error) {
      toast.error(error.message);
    },
    onCompleted() {
      refetch();
    },
  });

  const [afterFormSubmit, { loading: loadFormSubmit }] = useMutation(
    mutations.afterFormSubmit,
    {
      
    }
  );

  const handleLeasing = () => {
    // changeStatus();
    // router.push('/leasing');
  };

  const handleAfterPay = () => {
    changeStatus();
    setOpen(true);
  };

  return (
    <>
      <Modal
        trigger={
          <Button
            className="-pay-btn mx-2"
            variant="slim"
            loading={loading}
            onClick={handleLeasing}
          >
            Зээлээр авах
          </Button>
        }
        contentClassName="order-detail-leasing"
      >
        <ErxesForm brandId="3fpXck" formId="2jfJy7" />
      </Modal>
      <Button
        variant="slim"
        className="-pay-btn"
        loading={loading}
        onClick={handleAfterPay}
      >
        Шууд захиалах
      </Button>
      <Modal open={open} onOpenChange={() => setOpen((prev) => !prev)}>
        <div className="order-end-modal">
          <ErxesForm brandId="NMoDpG" formId="ep5mM9" />
        </div>
      </Modal>
    </>
  );
};

export default OrderEnd;
