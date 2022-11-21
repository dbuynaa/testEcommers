import Phone from 'icons/phone';

const HeaderTop = () => {
  return (
    <div className="top py-2">
      <b className="flex justify-between sbt">
        <a>Биднийг сонгох 10 шалтгаан</a>
        <a className="text-primary">
          Монгол улсын аль ч хэсэгт 2 хоногын дотор хүргэнэ.
        </a>
        <a className="flex items-center" href="tel:7510-3000">
          <Phone />
          <span className="ps-3">7510-3000</span>
        </a>
      </b>
    </div>
  );
};

export default HeaderTop;
