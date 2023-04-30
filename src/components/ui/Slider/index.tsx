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

export const slickSettings: Settings = {
  speed: 500,
  infinite: false,
  arrows: true,
  lazyLoad: 'anticipated',
  customPaging: () => <Button />,
  prevArrow: (
    <ArrowBtn className="slick-prev">
      <ChevronLeft />
    </ArrowBtn>
  ),
  nextArrow: (
    <ArrowBtn className="slick-next">
      <ChevronRight />
    </ArrowBtn>
  ),
};

const Slider = (props: Settings) => {
  const updatedProps = {
    ...slickSettings,
    ...props,
  };
  return <ReactSlider {...updatedProps} />;
};

export default Slider;
