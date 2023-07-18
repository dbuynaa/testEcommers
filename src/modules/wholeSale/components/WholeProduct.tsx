import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import Image from 'ui/Image';

function Item({ wholeProduct, wholeSale, index }) {
  const [difference, setDifference] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const endDate = dayjs(wholeSale.endDate);

    setInterval(() => {
      const days = endDate.diff(dayjs(), 'day');
      const hours = endDate.diff(dayjs(), 'hour');
      const minutes = endDate.diff(dayjs(), 'minute');
      const seconds = endDate.diff(dayjs(), 'second');
      setDifference({
        days: days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60
      });
    }, 1000);
  }, [wholeSale.endDate]);

  return (
    <div
      key={wholeProduct._id}
      className={`relative ${index === 0 ? 'col-span-2 row-span-3' : 'h-52'}`}
    >
      <Image
        src={wholeProduct.attachment.url}
        className={`${index === 0 ? 'w-full h-full object-cover' : ''} `}
        fill={false}
        alt="name"
      />

      <p>{wholeProduct.name}</p>
      <p>
        {difference.days}:{difference.hours}:{difference.minutes}:
        {difference.seconds}
      </p>
    </div>
  );
}

const WholeProduct = ({
  wholeProducts,
  wholeSales
}: {
  wholeProducts: [];
  wholeSales: [];
}) => {
  console.log(wholeProducts, '<---');

  return (
    <div className="grid  grid-cols-4 grid-rows-3 gap-8 ">
      {wholeProducts &&
        [...wholeProducts, ...wholeProducts]
          .reverse()
          .map((wholeProduct: any, index: number) => (
            <Item
              key={'asdasd' + index}
              wholeProduct={wholeProduct}
              index={index}
              wholeSale={wholeSales.find(
                (a: any) =>
                  !!a.products.find((b: any) => b === wholeProduct._id)
              )}
            />
          ))}
    </div>
  );
};

export default WholeProduct;
