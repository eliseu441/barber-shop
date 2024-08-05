import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function Home() {
    return (
        <div className="pagina-cadastro d-flex justify-content-center align-items-center ">
                <div className="card-cadastro  ms-3 me-3 col-sm-6" >
                    <h2 className="text-center title">Cadastro</h2>
                    <form class='row'> 
                        <div className="form-group mb-3 col-sm-6">
                            <label htmlFor="nome"class='inputText'>Nome:</label>
                            <input type="text" className="form-control" id="nome" name="nome" required />
                        </div>
                        <div className="form-group mb-3 col-sm-6">
                            <label htmlFor="sobrenome"class='inputText'>Sobrenome:</label>
                            <input type="text" className="form-control" id="sobrenome" name="sobrenome" required />
                        </div>
                        <div class = 'd -flex justify-content-center col-12'>
                        <div className="form-group mb-3 col-sm-8">
                            <label htmlFor="email"class='inputText'>Email:</label>
                            <input type="email" className="form-control" id="email" name="email" required />
                        </div>
                        </div>
                        <div className="form-group mb-3  col-sm-6">
                            <label htmlFor="senha"class='inputText'>Senha:</label>
                            <input type="password" className="form-control" id="senha" name="senha" required />
                        </div>
                        <div>
                        <button type="submit" className="btn btn-primary col-sm-6">Cadastrar</button>
                        </div>
                    </form>
                </div>
            </div>
    );
}

export default Home;