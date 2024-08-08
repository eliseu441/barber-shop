import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Preloader from "../../layout/preLoader/Preloader.jsx";
import APIS from '../../api/Calendar/Calendar';
import CustomPaging from "./Slider.jsx";

const Redirect = () => {
    return (
        <div className="selection">

            <div className="half-div left-div">
                <div class='button-red  mt-4 col-12 pe-5  d-flex justify-content-end'>
                <Link to="/barber">
                
                    <button style={{ whiteSpace: 'nowrap' }}> Saber mais
                    </button>
                    </Link>
                </div>

                <div class='half-background'>
                    <h1>Conheça a Barbearia</h1>
                    <br></br>
                    <h2>Nossos principais produtos são:</h2>
                    <ul>
                        <li>Corte de cabelo clássico</li>
                        <li>Barba e bigode</li>
                        <li>Tratamento capilar</li>
                        <li>Descoloração capilar</li>
                        <li>Venda de produtos Capilares</li>
                    </ul>
                    <br></br>

                    <p>mais sobre nosso trabalho...</p>

                    <div class='d-flex justify-content-center slider'>
                        <div class='col-sm-7 mt-5 ms-5 '>
                            <div>
                                <CustomPaging projectid={1}  ></CustomPaging>
                            </div>
                        </div>
                    </div>

                    <br></br>

                    <h2>Horário de Funcionamento:</h2>
                    <ul>
                        <li style={{ fontWeight: 'bolder' }}>Segunda a Sexta: 9h - 19h</li>
                        <li style={{ fontWeight: 'bolder' }}>Sábado: 9h - 17h</li>
                        <li style={{ fontWeight: 'bolder' }}>Domingo: Fechado</li>
                    </ul>
                </div>
            </div>

            <div className="half-div right-div">
                <div class='button-green ms-5 mt-4'>
                <Link to="/calendar">
                    <button style={{ whiteSpace: 'nowrap' }}> Agendar horario
                    </button>
                    </Link>
                </div>
                <div class='half-background'>
                    <h2>Como Agendar:</h2>
                    <p style={{ fontWeight: 'bolder', }}>Para agendar sua consulta, clique no botão acima em seguida clique no numero do dia a ser agendado no calendario e escolha o melhor horário para você. Estamos ansiosos para atendê-lo!</p>
                    <br></br>
                    <br></br>


                    <h2>Ofertas Especiais:</h2>
                    <ul>
                        <li><strong>Desconto de Boas-Vindas:</strong> Receba 20% de desconto na sua primeira visita!</li>
                        <li><strong>Pacote Fidelidade:</strong> Agende 3 cortes de cabelo e ganhe o 4º gratuitamente.</li>
                        <li><strong>Indique um Amigo:</strong> Indique um amigo e ambos recebem 10% de desconto na próxima visita.</li>
                        <li><strong>Combo Barba e Cabelo:</strong> Faça barba e cabelo juntos e economize 10% no total.</li>
                    </ul>
                    <div class='hideMobile'>
                        <h2>Benefícios Exclusivos:</h2>
                        <ul>
                            <li><strong>Atendimento VIP:</strong> Clientes que agendam online não tem problemas com filas de espera.</li>
                            <li><strong>Consultoria Personalizada:</strong> Nossos barbeiros oferecem dicas e recomendações personalizadas para o seu estilo.</li>
                        </ul>

                        <h2>Depoimentos de Clientes:</h2>
                        <blockquote>
                            "Agendar online foi super fácil e rápido. o sistema é simples e intuitivo!" - Lula
                        </blockquote>
                        <blockquote>
                            "Indiquei meu amigo e ambos recebemos desconto. Atendimento excelente!" - Bolsonaro
                        </blockquote>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Redirect;