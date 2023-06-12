import Button from 'ui/Button';
import Modal from 'ui/Modal';
import PaymentContainer from 'modules/checkout/PaymentContainer';
import Config from 'modules/auth/Config';

const PaymentBtn = ({
  totalAmount,
  orderId,
  phone,
  number,
  paidDate,
  registerNumber,
  billType,
}: {
  totalAmount: string;
  orderId: string;
  phone: string;
  number: string;
  paidDate?: string;
  registerNumber: string;
  billType: string;
}) => {
  return (
    <Modal
      trigger={<Button className="-pay-btn bg-blue mx-2">Төлбөр төлөх</Button>}
      contentClassName="payment-modal"
    >
      <Config>
        <PaymentContainer
          totalAmount={totalAmount}
          orderId={orderId}
          phone={phone}
          number={number}
          paidDate={paidDate}
          registerNumber={registerNumber}
          billType={billType}
        />
      </Config>
    </Modal>
  );
};

export default PaymentBtn;
