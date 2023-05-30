import FeaturedPayment from './FeaturedPayment';
import Modal from 'ui/Modal';
import Image from 'ui/Image';
import Button from 'ui/Button';
import StorepayIcon from 'icons/Storepay';
import { useDetailContext } from 'components/ProductDetail/Context';
import Check from 'icons/Check';
import { useState } from 'react';

const TechLeasing = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FeaturedPayment
        name="Tech Leasing"
        image="/images/techleasing.png"
        description="Та зээлийн нөхцөлөөр энэхүү барааг авах боломжтой."
        onClick={() => setOpen(true)}
      />
      <Modal
        contentClassName="storepay-modal"
        open={open}
        onOpenChange={() => setOpen((prev) => !prev)}
      >
        <Image
          src="/images/techleasing.png"
          width={100}
          height={42}
          alt=""
          className="-logo"
        />

        <h6 className="py-md-5 py-4">
          Та энэ барааг Techleasing үйлчилгээ ашиглан хамгийн түргэн шуурхай
          100% онлайн зээлээр авах боломжтой.
        </h6>

        <p className="text-center pb-md-5 pb-4">
          Захиалгын мэдээлэл хэсгээс зээлээр авах сонгоно
        </p>
        {children}
      </Modal>
    </>
  );
};

const dateList = ['Өнөөдөр', '15 дахь хоног', '30 дахь хоног', '45 дахь хоног'];

const PlanItem = ({ index }) => {
  const { unitPrice } = useDetailContext();
  return (
    <div className="col-12 col-md-6 p-2">
      <Button className="storepay-plan__item" variant="slim" riffle={false}>
        <div className="-svg">
          <StorepayIcon step={index} />
          <h6>{index === 4 ? <Check /> : index} </h6>
        </div>
        <div className="-text ps-2 ms-1">
          <span>{dateList[index - 1]}</span>
          <h6>{(unitPrice / 4).toLocaleString()} ₮</h6>
        </div>
      </Button>
    </div>
  );
};

export default TechLeasing;
