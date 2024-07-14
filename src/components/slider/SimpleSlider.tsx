import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SliderItem } from "./SliderItem";
import gaemi from "../../../public/gaemi1.png";
export default function SimpleSlider() {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    // dotsClass: "custom-class-name:",
    slidesToShow: 1,
    slidesToScroll: 1,
    // autoplay: true,
    speed: 1000,
    // autoplaySpeed: 5000,
  };
  return (
    <Slider {...settings}>
      <div>
        <SliderItem srcImg={gaemi} />
      </div>
      <div>
        <h3>22222</h3>
      </div>
      <div>
        <h3>33333</h3>
      </div>
      <div>
        <h3>44444</h3>
      </div>
      <div>
        <h3>555555</h3>
      </div>
    </Slider>
  );
}
