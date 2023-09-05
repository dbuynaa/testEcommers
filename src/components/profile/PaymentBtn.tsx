import Button from 'ui/Button';
import Modal from 'ui/Modal';
import PaymentContainer from 'modules/checkout/PaymentContainer';
import Config from 'modules/auth/Config';

const PaymentBtn = ({ orderDetail, refetch }: { orderDetail: string; refetch: any }) => {
  return (
    <Modal trigger={<Button className="btn flat w-full p-3 sum-buy">Төлбөр төлөх</Button>} contentClassName="payment-modal">
      <Config>
        <PaymentContainer orderDetail={orderDetail} refetch={refetch} />
      </Config>
    </Modal>
  );
};

export default PaymentBtn;
