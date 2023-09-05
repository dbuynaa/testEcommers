import clsx from 'clsx';
import Check from 'icons/Check';
import { usePathname } from 'next/navigation';

function OrderSteps() {
  const steps = {
    cart: 'Taны сагс',
    address: 'Хүргэлтийн Хаяг',
    confirm: 'Баталгаажуулах',
    payment: 'Төлбөр төлөх',
  };
  const pathname = usePathname();

  const current = pathname?.replace('/checkout/', '') || '';

  const keys = Object.keys(steps);

  return (
    <>
      <div className="flex mt-6 justify-between items-center order-steps container c-md pt-4 pb-3 ">
        {keys.map((step, idx) => (
          <div
            className={clsx(
              'order-steps-step mt-6 text-center block',
              {
                checked: idx < keys.indexOf(current),
              },
              {
                current: step === current,
              }
            )}
            key={idx}
          >
            <div className="order-step-item px-1 md:px-2">
              <div className="flex items-center justify-center circle">
                <p className="sbt ">{idx + 1}</p>
                <Check />
              </div>
            </div>
            <small className=" sm:text-xs mt-1 block text-mid-gray step-title">{steps[step as keyof typeof steps]}</small>
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderSteps;
