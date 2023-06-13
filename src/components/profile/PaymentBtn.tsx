import Button from 'ui/Button';
import Modal from 'ui/Modal';
import PaymentContainer from 'modules/checkout/PaymentContainer';
import Config from 'modules/auth/Config';

const PaymentBtn = ({ orderDetail }: { orderDetail: string }) => {
  return (
    <Modal
      trigger={<Button className="-pay-btn bg-blue mx-2">Төлбөр төлөх</Button>}
      contentClassName="payment-modal"
    >
      <Config>
        <PaymentContainer orderDetail={orderDetail} />
      </Config>
    </Modal>
  );
};

export default PaymentBtn;
