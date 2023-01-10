import Image from 'next/image';
import Button from 'ui/Button';
const NewsBanner = () => {
  return (
    <div className="col-12 col-md-8">
      <div className="news-banner ">
        <div className="img-wrap ratio yt-video">
          <Image src="/images/uul.jpeg" fill alt="" />
        </div>
        <div className="news-banner-tag px-5 py-3 py-md-2 ">
          <b>Шинэ мэдээ</b>
        </div>
        <div className="-content p-3 p-md-5">
          <p className="-tag pb-1">
            #technews <span className="ps-1">2022-03-18</span>
          </p>
          <h5>XIAOMI БА ТЕХНОЛОГИЙН ХУВЬСАЛЫН ЦАР ХҮРЭЭ</h5>
          <Button variant="slim" className="mt-3">
            Цааш унших
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsBanner;
