import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Cadastro = () => {
    const [inputParams, setInputParams] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    });
    const [isBlackBlockVisible, setIsBlackBlockVisible] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica de submissão do formulário
    };

    const check = () => {
        // Lógica de verificação
    };

    const toggleBlackBlock = () => {
        setIsBlackBlockVisible(!isBlackBlockVisible);
    };


    /*
    
                        <div class="mydict">
                            <div>
                                <label>
                                    <input type="radio" name="radio" checked="" />
                                    <span>Barbearia</span>
                                </label>
                                <label>
                                    <input type="radio" name="radio" />
                                    <span>Salão</span>
                                </label>
    
                            </div>
                        </div>
    */

    return (
        <>
            <div className=" pagina-cadastro d-flex flex-column justify-content-center align-items-center row">
                <div class='col-12'>
                    <label class="switch-button" for="switch" >
                        <div class="switch-outer">
                            <input id="switch" type="checkbox" onClick={toggleBlackBlock} />
                            <div class="button">
                                <span class="button-toggle"></span>
                                <span class="button-indicator"></span>
                            </div>
                        </div>
                    </label>
                    <h2 className="text-center title">{!isBlackBlockVisible ? 'Novo cadastro' : 'Login'}</h2>
                </div>
                <div class='col-11 d-flex justify-content-center'>
                    <div className="card-cadastro   p-0 col-xl-8 row">
                        <div className="cadastro-container">


                            <div className="row">
                                <div className="col-6 p-2 side-new form-container">
                                    <div class=''>
                                        <div className={`black-block ${!isBlackBlockVisible ? 'right-block' : ''}`}></div>
                                    </div>
                                    <form className="row formInputs" onSubmit={handleSubmit}>
                                        
                                        <div className="form-group mb-3 col-xl-6">
                                            <label htmlFor="nome" className="inputText">Nome:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="nome"
                                                name="nome"
                                                value={inputParams.nome}
                                                onChange={(e) => setInputParams({ ...inputParams, nome: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="form-group mb-3 col-xl-6">
                                            <label htmlFor="sobrenome" className="inputText">Sobrenome:</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="sobrenome"
                                                name="sobrenome"
                                                value={inputParams.sobrenome}
                                                onChange={(e) => setInputParams({ ...inputParams, sobrenome: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center col-12">
                                            <div className="form-group mb-3 col-xl-8">
                                                <label htmlFor="email" className="inputText">Email:</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={inputParams.email}
                                                    onChange={(e) => setInputParams({ ...inputParams, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center col-12">
                                            <div className="form-group mb-3 col-xl-6">
                                                <label htmlFor="senha" className="inputText">Senha:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="senha"
                                                    name="senha"
                                                    value={inputParams.senha}
                                                    onChange={(e) => setInputParams({ ...inputParams, senha: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex justify-content-center">
                                            <div className="col-sm-4 button-green">
                                                <Link to="barber">
                                                    <button onClick={e => check()}> CADASTRAR
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="col-6 side-existent form-container">
                                    <form className="row formInputs" onSubmit={handleSubmit}>

                                        <div className="d-flex justify-content-center col-12 mt-3">
                                            <div className="form-group mb-3 col-xl-8">
                                                <label htmlFor="email" className="inputText">Email:</label>
                                                <input
                                                    type="email"
                                                    className="form-control"
                                                    id="email"
                                                    name="email"
                                                    value={inputParams.email}
                                                    onChange={(e) => setInputParams({ ...inputParams, email: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-center col-12">
                                            <div className="form-group mb-3 col-xl-6">
                                                <label htmlFor="senha" className="inputText">Senha:</label>
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    id="senha"
                                                    name="senha"
                                                    value={inputParams.senha}
                                                    onChange={(e) => setInputParams({ ...inputParams, senha: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex justify-content-center">
                                            <div className="col-sm-4 button-red">
                                                <Link to="barber">
                                                    <button onClick={e => check()}> LOGIN
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cadastro;