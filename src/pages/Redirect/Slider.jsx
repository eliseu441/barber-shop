import React, { Component } from "react";
import Slider from "react-slick";

  
function CustomPaging(params) {

    const projeto = params.projectid == 1 ? 'redirect' : params.projectid == 2 ? 'th' : 'hermes'
    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <div className="slick-next">→</div>,
        prevArrow: <div className="slick-prev">←</div>,
    };


    return (
        <Slider {...settings}>
            <div>
                <img src={`/img/${projeto}/${projeto}1.jpeg`} className="imgSlider" />
            </div>
            <div>
                <img src={`/img/${projeto}/${projeto}2.avif`} className="imgSlider" />
            </div>
            <div>
                <img src={`/img/${projeto}/${projeto}3.jpg`} className="imgSlider" />
            </div>
            <div>
                <img src={`/img/${projeto}/${projeto}4.jpg`} className="imgSlider" />
            </div>
        </Slider>
    );
}

export default CustomPaging;