import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderItem } from "./SliderItem";
import onboarding1 from "../../../public/onboarding1.png";
import onboarding2 from "../../../public/onboarding2.png";
import onboarding21 from "../../../public/onboarding2-1.png";
import onboarding3 from "../../../public/onboarding3.png";
import onboarding31 from "../../../public/onboarding3-1.png";
import onboarding4 from "../../../public/onboarding4.png";
import onboarding5 from "../../../public/onboarding5.png";
export default function SimpleSlider() {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    // dotsClass: "custom-class-name:",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
  };

  const textItems = [
    {
      text1: "건강한 일상 회복을 위한",
      text2: "새로운 시작 개짱이와 함께해요",
      srcImg: onboarding1,
    },
    {
      srcImg: onboarding2,
      subImg: onboarding21,
    },
    {
      srcImg: onboarding3,
      subImg: onboarding31,
    },
    {
      srcImg: onboarding4,
    },
    {
      srcImg: onboarding5,
    },
  ];

  return (
    <Slider {...settings}>
      {textItems.map((item, index) => (
        <div key={index}>
          <SliderItem
            srcImg={item.srcImg}
            subImg={item.subImg}
            text1={item.text1}
            text2={item.text2}
          />
        </div>
      ))}
    </Slider>
  );
}
