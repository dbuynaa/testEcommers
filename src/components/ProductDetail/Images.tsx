'use client';

import { useState } from 'react';
import Slider from 'react-slick';
import Image from 'ui/Image';

const ImageGallery = ({ images }: any) => {
  const [nav1, setNav1] = useState<any>();
  const [nav2, setNav2] = useState<any>();
  return (
    <>
      <Slider
        asNavFor={nav2}
        ref={(slider1) => setNav1(slider1)}
        fade={true}
        arrows={false}
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
      <div className="px-md-5 my-4">
        <Slider
          asNavFor={nav1}
          ref={(slider2) => setNav2(slider2)}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
          infinite={false}
          arrows={true}
          className="img-nav"
          prevArrow={
            <div className="slick-prev">
              <i className="fas fa-chevron-left"></i>
            </div>
          }
          nextArrow={
            <div className="slick-next">
              <i className="fas fa-chevron-right"></i>
            </div>
          }
        >
          {images.map((url: any, index: any) => (
            <div key={index} className="p-2">
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
