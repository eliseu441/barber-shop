import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Preloader from "../../layout/preLoader/Preloader.jsx";
import APIS from '../../api/Calendar/Calendar';
import { useNavigate } from 'react-router-dom';
import { useAppParams } from '../../layout/AppParams/AppParams.jsx';

const Cadastro = () => {
    const navigate = useNavigate();
    const { setUsuario, setPerfil } = useAppParams();
    const [inputParams, setInputParams] = useState({
        nome: '',
        sobrenome: '',
        email: '',
        senha: ''
    });
    const [isBlackBlockVisible, setIsBlackBlockVisible] = useState(true);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 2500);
    }, []);

    async function insertUser() {
        try {
            setIsLoading(true);
            const insert = {
                name: inputParams.nome,
                email: inputParams.email,
                password: inputParams.senha,
                permission: 2
            };
            const response = await APIS.insertUsers(insert);
            setUsuario(response.data.name);
            setPerfil(response.data.permission);
            setIsLoading(false);
        } catch (err) {
            console.error(err);
            setIsLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const check = async (e, tipo) => {
        setIsLoading(true)
        if (tipo === 1) {
            try {
                await insertUser();
                alert('Usuário cadastrado com sucesso!');
                navigate('/redirect');
            } catch (error) {
                setIsLoading(false);
                alert('Erro ao inserir usuário!');
                console.error('Erro ao inserir usuário:', error);
            }
        } else if (tipo === 2) {
            try {
                const response = await APIS.findUser({ email: inputParams.email, password: inputParams.senha });
                if (response.data && Object.keys(response.data).length > 0) {
                    alert('Logado com sucesso!');
                    await setUsuario(response.data.name);
                    await setPerfil(response.data.permission);
                    navigate('/redirect');
                } else {
                    alert('Login e/ou senha incorretos!');
                }
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        }
        setIsLoading(false);
    };

    const toggleBlackBlock = () => {
        setInputParams({
            nome: '',
            sobrenome: '',
            email: '',
            senha: ''
        });
        setIsBlackBlockVisible(!isBlackBlockVisible);
    };

    return (
        <>
            {isLoading ? <Preloader /> : <></>}
            <div className="pagina-cadastro d-flex flex-column justify-content-center align-items-center row">
                <div className='col-12'>
                    <label className="switch-button" htmlFor="switch">
                        <div className="switch-outer">
                            <input id="switch" type="checkbox" onClick={toggleBlackBlock} />
                            <div className="button">
                                <span className="button-toggle"></span>
                                <span className="button-indicator"></span>
                            </div>
                        </div>
                    </label>
                    <h2 className="text-center title">{!isBlackBlockVisible ? 'Novo cadastro' : 'Login'}</h2>
                </div>
                <div className='col-11 d-flex justify-content-center'>
                    <div className="card-cadastro p-0 col-xl-8 row">
                        <div className="cadastro-container">
                            <div className="row">
                                <div className="col-6 p-2 side-new form-container">
                                    <div className=''>
                                        <div className={`black-block ${!isBlackBlockVisible ? 'right-block' : ''}`}></div>
                                    </div>
                                    <form className="row formInputs" onSubmit={handleSubmit}>
                                        <div className='d-flex justify-content-center'>
                                            <div className="form-group mb-3 col-xl-9">
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
                                        </div>
                                        <div className='d-flex justify-content-center'>
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
                                        <div className='d-flex justify-content-center'>
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
                                                <button onClick={e => check(inputParams, 1)}> CADASTRAR
                                                </button>
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
                                                    name="senha"
                                                    value={inputParams.senha}
                                                    onChange={(e) => setInputParams({ ...inputParams, senha: e.target.value })}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div className="col-12 d-flex justify-content-center">
                                            <div className="col-sm-4 button-red">
                                                <button onClick={e => check(inputParams, 2)}> LOGIN
                                                </button>
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