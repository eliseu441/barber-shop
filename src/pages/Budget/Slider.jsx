import React from "react";
import Slider from "react-slick";

function CustomPaging(params) {
    const projeto = params.projectid == 1 ? 'budget' : params.projectid == 2 ? 'th' : 'hermes';
    const settings = {
        dots: true,
        dotsClass: "slick-dots slick-thumb",
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
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
            <div className='d-flex justify-content-center row'>
                <img src={`/img/${projeto}/${projeto}1.png`} className="imgSlider" />
                <p className="text-center">Aparar barba</p>
                <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => handleButtonClick('barba R$:30')}>+adicionar item</button>
            </div>
            <div className='d-flex justify-content-center row'>
                <img src={`/img/${projeto}/${projeto}2.png`} className="imgSlider" />
                <p className="text-center">Corte de cabelo</p>
                <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => handleButtonClick('cabelo R$:50')}>+adicionar item</button>
            </div>
            <div className='d-flex justify-content-center row'>
                <img src={`/img/${projeto}/${projeto}3.png`} className="imgSlider" />
                <p className="text-center">Descoloração Capilar</p>
                <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => handleButtonClick('descoloracao R$:70')}>+adicionar item</button>
            </div>
            <div className='d-flex justify-content-center row'>
                <img src={`/img/${projeto}/${projeto}4.png`} className="imgSlider" />
                <p className="text-center">Corte a tesoura</p>
                <button className="btn btn-primary" style={{ width: '200px' }} onClick={() => handleButtonClick('tesoura R$:40')}>+adicionar item</button>
            </div>
        </Slider>
    );
}

export default CustomPaging;