import React, { useState, useEffect} from "react";
import { Link } from 'react-router-dom';
function Cadastro() {
    const [inputParams, setInputParams] = useState({ nome: '', sobrenome: '', email: '', senha: '' });

    useEffect(() => {
        console.log('Componente montado ou atualizado');
    }, [inputParams]);
    async function check(event) {

        console.log(inputParams.nome, inputParams.sobrenome, inputParams.email, inputParams.senha);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputParams.nome, inputParams.sobrenome, inputParams.email, inputParams.senha);
    };

    return (
        
        <div className="pagina-cadastro d-flex justify-content-center align-items-center">
            
            <div className="card-cadastro ms-3 me-3 col-sm-6">
                <div class="mydict">
                    <div>
                        <label>
                            <input type="radio" name="radio" checked=""/>
                                <span>Barbearia</span>
                        </label>
                        <label>
                            <input type="radio" name="radio"/>
                                <span>Salão</span>
                        </label>

                    </div>
                </div>
                <h2 className="text-center title" >Cadastro para Barbearia</h2>
                <form className="row" onSubmit={handleSubmit}>
                    <div className="form-group mb-3 col-sm-6">
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
                    <div className="form-group mb-3 col-sm-6">
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
                        <div className="form-group mb-3 col-sm-8">
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
                        <div className="form-group mb-3 col-sm-6">
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
                        <div className="col-sm-4">
                        <Link to="barber">
                            <button type="submit" className="btn btn-primary col-sm-4" htmlFor='barber' onClick={e => check()}>Cadastrar</button>
                        </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Cadastro;