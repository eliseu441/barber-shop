import React from "react";
import Slider from "react-slick";

function CustomPaging(params) {
    const projeto = params.projectid == 1 ? 'budget' : params.projectid == 2 ? 'th' : 'hermes';
    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <div className="slick-next">→</div>,
        prevArrow: <div className="slick-prev">←</div>,
    };

    const handleButtonClick = (value) => {
        if (params.onButtonClick) {
            params.onButtonClick(value);
        }
    };

    return (
        <Slider {...settings}>
            <div className='d-flex justify-content-center row p-2'>
                <img src={`/img/${projeto}/${projeto}1.png`} className="imgSlider" />
                <p className="title-service text-center text-nowrap overflow-hidden">Aparar barba</p>
                <div className="button-red d-flex justify-content-center">
                    <button className="btn-center" onClick={() => handleButtonClick('barba R$:30')}>
                        R$30
                    </button>
                </div>
            </div>
            <div className='d-flex justify-content-center row p-2'>
                <img src={`/img/${projeto}/${projeto}2.png`} className="imgSlider" />
                <p className="title-service text-center text-nowrap overflow-hidden">Corte simples</p>
                <div className="button-red d-flex justify-content-center">
                    <button className="btn-center" onClick={() => handleButtonClick('cabelo R$:50')}>
                        R$50
                    </button>
                </div>
            </div>
            <div className='d-flex justify-content-center row p-2'>
                <img src={`/img/${projeto}/${projeto}3.png`} className="imgSlider" />
                <p className="title-service text-center text-nowrap overflow-hidden">Descoloração Capilar</p>
                <div className="button-red d-flex justify-content-center">
                    <button className="btn-center" onClick={() => handleButtonClick('descoloracao R$:70')}>
                        R$70
                    </button>
                </div>
            </div>
            <div className='d-flex justify-content-center row p-2'>
                <img src={`/img/${projeto}/${projeto}4.png`} className="imgSlider" />
                <p className="title-service text-center text-nowrap overflow-hidden">Corte a tesoura</p>
                <div className="button-red d-flex justify-content-center">
                    <button className="btn-center" onClick={() => handleButtonClick('tesoura R$:40')}>
                        R$40
                    </button>
                </div>
            </div>
        </Slider>
    );
}

export default CustomPaging;