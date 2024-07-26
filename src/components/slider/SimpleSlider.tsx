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
      text1: "나의 행복을 위해",
      text2: "나만의 루틴을 만들어보세요",
      srcImg: onboarding2,
      subImg: onboarding21,
    },
    {
      text1: "개짱이와 함께",
      text2: "일상의 균형을 맞춰가요",
      srcImg: onboarding3,
      subImg: onboarding31,
    },
    {
      text1: "루틴 통계 기록을 보고",
      text2: "나의 성향을 알아가요",
      srcImg: onboarding4,
    },
    {
      text1: "개미와 베짱이 유형에 맞춰",
      text2: "나의 하루를 공유해요",
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
