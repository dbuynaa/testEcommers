'use client';

import { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'ui/Image';
import ChevronRight from 'icons/ChevronRight';
import ChevronLeft from 'icons/ChevronLeft';

const ImageGallery = ({ images }: any) => {
  const [nav1, setNav1] = useState<any>();
  const [nav2, setNav2] = useState<any>();
  return (
    <>
      <Slider
        fade={true}
        arrows={false}
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        className="prDtl__slider"
      >
        {images.map((url: any, index: any) => (
          <div key={index} className="img-wrap">
            <Image
              src={url}
              alt="product"
              quality={100}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </Slider>
      <div className="px-md-5 my-4 img-nav-container">
        <Slider
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={false}
          arrows={true}
          className="img-nav"
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          prevArrow={
            <div className="slick-prev">
              <ChevronLeft />
            </div>
          }
          nextArrow={
            <div className="slick-next">
              <ChevronRight />
            </div>
          }
        >
          {images.map((url: any, index: any) => (
            <div
              key={index}
              className="p-2"
              // onClick={() => nav1.current.slickGoTo(index)}
            >
              <div className="img-wrap">
                <Image
                  src={url}
                  alt="product"
                  sizes="(max-width: 768px) 20vw, 10vw"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default ImageGallery;
