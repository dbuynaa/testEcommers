import { Settings } from 'react-slick';
import ChevronRight from 'icons/ChevronRight';
import ChevronLeft from 'icons/ChevronLeft';
import Button from 'ui/Button';
export const validatePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export const slickSettings: Settings = {
  speed: 500,
  infinite: false,
  arrows: true,
  lazyLoad: 'ondemand',
  prevArrow: (
    <Button className="slick-prev">
      <ChevronLeft />
    </Button>
  ),
  nextArrow: (
    <Button className="slick-next">
      <ChevronRight />
    </Button>
  ),
};
