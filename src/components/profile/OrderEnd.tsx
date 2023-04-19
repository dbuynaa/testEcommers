import Question from 'icons/Question';
import Button from 'ui/Button';
import Modal from 'ui/Modal';
import ErxesForm from 'ui/ErxesForm';

const OrderEnd = () => {
  return (
    <div className="row col-12">
      <div className="col-4"></div>
      <div className="col-8 text-mid-gray order-end pt-3 items-center">
        <Question />
        <p>
          Хэрвээ та манайд байгаа төлбөрийн хэрэгслүүдээс өөрөөр төлбөрөө
          төлөхийг хүсвэл{' '}
          <Modal trigger={<Button variant="ghost">энд</Button>}>
            <div className="order-end-modal">
              <ErxesForm brandId="NMoDpG" formId="ep5mM9" />
            </div>
          </Modal>{' '}
          дарна уу
        </p>
      </div>
    </div>
  );
};

export default OrderEnd;
