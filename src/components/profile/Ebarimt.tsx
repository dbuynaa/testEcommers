import Button from 'ui/Button';
import Modal from 'ui/Modal';
import { QRCodeSVG } from 'qrcode.react';
import { formatCurrency } from 'utils';

const types = {
  '1': 'Хувь хүн',
  '3': 'Aлбан байгуулга',
};

const Ebarimt = ({ putResponses }: any) => {
  return (
    <Modal
      trigger={<Button className="-pay-btn bg-blue">И-Баримт авах</Button>}
    >
      <div className="ebarimt">
        <h5 className="pb-4">И-Баримт</h5>
        {putResponses.map(
          ({ qrData, billType, billId, lottery, amount }: any, idx: number) => (
            <div key={idx}>
              <div className="qr-code">
                <QRCodeSVG value={qrData} />
              </div>
              <div className="pt-4">
                <div className="row">
                  <div className="text-mid-gray">Харилцагч :</div>
                  <b>{types[billType as keyof typeof types]}</b>
                </div>
                <div className="row">
                  <div className="text-mid-gray">ДДТД :</div>
                  <b>{billId}</b>
                </div>
                <div className="row">
                  <div className="text-mid-gray">Сугалааны дугаар :</div>
                  <b>{lottery}</b>
                </div>

                <div className="row">
                  <div className="text-mid-gray"> Бүртгүүлэх дүн :</div>
                  <b>{formatCurrency(amount)}</b>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </Modal>
  );
};

export default Ebarimt;
