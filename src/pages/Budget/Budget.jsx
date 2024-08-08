import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Preloader from "../../layout/preLoader/Preloader.jsx";
import APIS from '../../api/Calendar/Calendar';
import CustomPaging from "./Slider.jsx";

const Redirect = () => {
    const [receivedValues, setReceivedValues] = useState([]);

    const handleButtonClick = (value) => {
        console.log("Valor recebido do filho:", value);
        setReceivedValues(prevValues => [...prevValues, value]);
    };

    const handleRemoveClick = (index) => {
        setReceivedValues(prevValues => prevValues.filter((_, i) => i !== index));
    };

    const calculateTotal = () => {
        return receivedValues.reduce((total, item) => {
            const price = parseFloat(item.split('R$:')[1]);
            return total + (isNaN(price) ? 0 : price);
        }, 0);
    };

    return (
        <div className="budgetPage">
            <h1>Montagem de orçamento online</h1>
            <div className='slider col-12 d-flex justify-content-center'>
                <div className='col-12'>
                    <CustomPaging projectid={1} onButtonClick={handleButtonClick} />
                </div>
            </div>
            <div className="cart d-flex col-12 ps-5 pe-5 justify-content-center row" style={{marginTop:'80px'}}>
                {receivedValues.map((value, index) => (
                    <div key={index} className="cardBudget m-1">
                        <div class='d-flex justify-content-end'>
                        <button className="btn btn-danger btn-sm" style={{width:'min-content'}} onClick={() => handleRemoveClick(index)}>X</button>
                        </div><h2>{value}</h2>
                    </div>
                ))}
            </div>
            <div className="total-card d-flex col-12 justify-content-center" style={{marginTop:'20px'}}>
                <div className="cardTotal m-1">
                    <h2>Total: R$ {calculateTotal().toFixed(2)}</h2>
                </div>
            </div>
        </div>
    );
}

export default Redirect;