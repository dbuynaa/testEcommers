import FeaturedPayment from './FeaturedPayment';
import Modal from 'ui/Modal';
import Image from 'ui/Image';
import Button from 'ui/Button';
import StorepayIcon from 'icons/Storepay';
import { useDetailContext } from 'components/ProductDetail/Context';
import Check from 'icons/Check';
import Link from 'next/link';
import { useState } from 'react';

const Storepay = ({ children }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <FeaturedPayment
        name="StorePay"
        image="/images/storepay.png"
        description="Storepay үйлчилгээг ашиглан төлбөрөө 4 хуваан төлөх боломжтой."
        onClick={() => setOpen(true)}
      />
      <Modal
        contentClassName="storepay-modal"
        open={open}
        onOpenChange={() => setOpen((prev) => !prev)}
      >
        <Image
          src="/images/sp_logo.png"
          width={225}
          height={42}
          alt=""
          className="-logo"
        />

        <h6 className="py-md-4 py-4">
          Tа хүссэн бүтээгдэхүүнээ ямар ч хүү, шимтгэлгүй 4 хуваан төлөх
          нөхцөлөөр авах боломжтой
        </h6>

        <div className="storepay-plan">
          <h6 className="mb-2">
            <b>Тооцоолуур</b>
          </h6>
          <div className="row mx--2">
            {Array.from({ length: 4 }).map((_, index) => (
              <PlanItem index={index + 1} key={index} />
            ))}
          </div>
        </div>

        <p className="py-md-4 py-3 mb-2">
          Tа Storepay эрхтэй бол 100,000₮-аас дээш бараа, бүтээгдэхүүнээ <br />{' '}
          сагслан “Төлбөр төлөх” товч дарж төлбөрийн нөхцөлүүдээс <br />{' '}
          “Storepay”-ийг сонгон худалдан авалтаа хийгээрэй.
        </p>
        {children}
        <div className="row pt-md-3 pt-4">
          <div className="flex justify-end items-center col-12 col-md-4 download">
            <Link
              href={
                'https://play.google.com/store/apps/details?id=com.storepay&hl=en_US'
              }
              target="_blank"
              className="me-3"
            >
              <Image src={'/images/gplay.png'} alt="" height={40} width={36} />
            </Link>
            <Link
              href={'https://apps.apple.com/us/app/storepay/id1470947761'}
              target="_blank"
              className="mx-2"
            >
              <Image
                src={'/images/app-store.png'}
                alt=""
                height={40}
                width={40}
                className="app-store"
              />
            </Link>
          </div>
          <p className="col-0 col-md-6 download-desc">
            Storepay аппликейшнийг гар утсандаа <br /> татан авч эрхээ
            нээлгээрэй.
          </p>
        </div>
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

export default Storepay;
