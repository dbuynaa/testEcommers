import clsx from 'clsx';
import Image from 'next/image';
import Button from 'ui/Button';

const NewsItem = ({ className }: { className: string }) => {
  return (
    <div className={clsx('news-item row', className)}>
      <div className="img-wrap ratio">
        <Image fill alt="" src="/images/uul.jpeg" />
      </div>
      <div className="news-item-content ">
        <big className="block">Гар утасны зах зээлд хувьсал гарлаа</big>
        <div className="flex justify-between text-mid-gray items-center">
          2022-3-18
          <Button variant="ghost" className="text-mid-gray">
            Цааш унших
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsItem;
