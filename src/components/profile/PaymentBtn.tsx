import Button from 'ui/Button';
import Modal from 'ui/Modal';
import PaymentContainer from 'modules/checkout/PaymentContainer';
import Config from 'modules/auth/Config';

const PaymentBtn = ({
  totalAmount,
  orderId,
}: {
  totalAmount: string;
  orderId: string;
}) => {
  return (
    <Modal trigger={<Button className="-pay-btn bg-blue">Төлбөр төлөх</Button>}>
      <Config>
        <PaymentContainer totalAmount={totalAmount} orderId={orderId} />
      </Config>
    </Modal>
  );
};

export default PaymentBtn;
