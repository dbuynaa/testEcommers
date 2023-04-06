import Button from 'ui/Button';
import Modal from 'ui/Modal';
import PaymentContainer from 'modules/checkout/PaymentContainer';
import Config from 'modules/auth/Config';

const PaymentBtn = ({
  totalAmount,
  orderId,
  phone,
}: {
  totalAmount: string;
  orderId: string;
  phone: string;
}) => {
  return (
    <Modal trigger={<Button className="-pay-btn bg-blue">Төлбөр төлөх</Button>}>
      <Config>
        <PaymentContainer totalAmount={totalAmount} orderId={orderId} phone={phone}/>
      </Config>
    </Modal>
  );
};

export default PaymentBtn;
