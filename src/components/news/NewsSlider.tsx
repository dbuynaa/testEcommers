'use client';

import Slider from 'react-slick';
import NewsItem from './item';
import type { ReactNode } from 'react';

const NewsSlider = ({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}) => {
  const settings = {
    slidesToShow: 4,
    speed: 500,

    infinite: false,
    // prevArrow: (
    //   <div className="slick-prev">
    //     <i className="fas fa-chevron-left"></i>
    //   </div>
    // ),
    // nextArrow: (
    //   <div className="slick-next">
    //     <i className="fas fa-chevron-right"></i>
    //   </div>
    // ),
    arrows: false,
    responsive: [
      {
        breakpoint: 770,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        },
      },
      {
        breakpoint: 570,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
        },
      },
    ],
  };
  return (
    <div>
      <h5 className="text-blue slider-news-title">{title}</h5>
      <div className="news-slider">
        <Slider {...settings}>{children}</Slider>
      </div>
    </div>
  );
};

export default NewsSlider;
