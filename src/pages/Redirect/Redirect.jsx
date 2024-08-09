import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preloader from "../../layout/preLoader/Preloader.jsx";
import APIS from '../../api/Calendar/Calendar';

const Redirect = () => {
    return (
        <div className="selection">
            <div className="half-div left-div">
                <div>
                    <h1>Conheça a Barbearia</h1>
                    <p class='ps-3 pe-3 ' >Por aqui você conhece detalhes dos serviços fornecidos, preços, horários e mais.</p>
                    <div class='button-red col-12 d-flex justify-content-center d-none'>
                        <Link to="/barber">
                            <button style={{ whiteSpace: 'nowrap' }}> Saber mais
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="half-div right-div">
                <div>
                    <h1>Agendar uma Consulta</h1>
                    <p class='ps-3 pe-3 ' >Aqui voce agenda seu corte atravéz do próprio sistema, evitando filas e economizando tempo.</p>
                    <div class='button-green col-12 d-flex justify-content-center d-none'>
                        <Link to="/calendar">
                            <button style={{ whiteSpace: 'nowrap' }}> Agendar horario
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Redirect;