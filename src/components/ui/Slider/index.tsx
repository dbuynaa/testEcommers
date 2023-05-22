import ReactSlider, { Settings } from 'react-slick';
import ChevronRight from 'icons/ChevronRight';
import ChevronLeft from 'icons/ChevronLeft';
import Button, { ButtonProps } from 'ui/Button';

const ArrowBtn = (props: ButtonProps) => (
  <Button
    {...props}
    disabled={(props.className || '').includes('slick-disabled')}
  />
);

const SlickArrowLeft = ({ currentSlide, slideCount, ...props }: any) => (
  <ArrowBtn
    className="slick-prev"
    {...props}
    aria-hidden="true"
    disabled={currentSlide === 0 ? true : false}
    aria-disabled={currentSlide === 0 ? true : false}
    type="button"
  >
    <ChevronLeft />
  </ArrowBtn>
);
const SlickArrowRight = ({ currentSlide, slideCount, ...props }: any) => (
  <ArrowBtn
    {...props}
    className="slick-next"
    aria-hidden="true"
    disabled={currentSlide === slideCount - 1 ? true : false}
    type="button"
  >
    <ChevronRight />
  </ArrowBtn>
);

export const slickSettings: Settings = {
  speed: 500,
  infinite: false,
  arrows: true,
  lazyLoad: 'anticipated',
  customPaging: () => <Button />,
  prevArrow: <SlickArrowLeft />,
  nextArrow: <SlickArrowRight />,
};

const Slider = (props: Settings) => {
  const updatedProps = {
    ...slickSettings,
    ...props,
  };
  return <ReactSlider {...updatedProps} />;
};

export default Slider;
