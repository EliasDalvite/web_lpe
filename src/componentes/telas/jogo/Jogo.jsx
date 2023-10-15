import { useState, useEffect } from "react";
import JogoContext from "./JogoContext";
import { getGeneroServico }
    from '../../../servicos/GeneroServico';
import {
    getJogoServico, getJogoServicoPorCodigoAPI,
    deleteJogoServico, cadastraJogoServico
}
    from '../../../servicos/JogoServico'
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from "react-router-dom";

function Jogo() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo: "", nome: ""});
    const [carregando, setCarregando] = useState(false);
    const [listaGeneros, setListaGeneros] = useState([]);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            horas_jogadas: "",
            genero: ""
        });
    }

    const editarObjeto = async codigo => {
        try {
            setEditar(true);
            setAlerta({ status: "", message: "" });
            setObjeto(await getJogoServicoPorCodigoAPI(codigo));
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraJogoServico(objeto, metodo);
            setAlerta({
                status: retornoAPI.status,
                message: retornoAPI.message
            });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaJogos();
    }

    const recuperaJogos = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getJogoServico());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaGeneros = async () => {
        setListaGeneros(await getGeneroServico());
    }

    const remover = async codigo => {
        try {
            if (window.confirm('Deseja remover este objeto')) {
                let retornoAPI = await deleteJogoServico(codigo);
                setAlerta({
                    status: retornoAPI.status,
                    message: retornoAPI.message
                });
                recuperaJogos();
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    useEffect(() => {
        recuperaJogos();
        recuperaGeneros();
    }, []);

    return (
        <JogoContext.Provider value={{
            alerta, setAlerta, listaObjetos, remover,
            objeto, editar, acaoCadastrar,
            handleChange, novoObjeto, editarObjeto, listaGeneros
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>

            <Form />
        </JogoContext.Provider>
    )
}

export default WithAuth(Jogo);