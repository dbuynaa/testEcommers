import Button from 'ui/Button';
import Modal from 'ui/Modal';
import PaymentContainer from 'modules/checkout/PaymentContainer';

const PaymentBtn = ({
  totalAmount,
  orderId,
}: {
  totalAmount: string;
  orderId: string;
}) => {
  return (
    <Modal trigger={<Button className="-pay-btn bg-blue">Төлбөр төлөх</Button>}>
      <PaymentContainer totalAmount={totalAmount} orderId={orderId} />
    </Modal>
  );
};

export default PaymentBtn;
