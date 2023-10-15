import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import JogoContext from './JogoContext';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, listaGeneros }
        = useContext(JogoContext);

    return (
        <Dialogo id="modalEdicao" titulo="Jogo" idformulario="formEdicao"
            acaoCadastrar={acaoCadastrar}>
            <Alerta alerta={alerta} />
            <CampoEntrada id="txtCodigo" label="Código" tipo="number"
                name="codigo"
                value={objeto.codigo}
                handlechange={handleChange}
                requerido={false} readonly={true}
                maximocaracteres={5} />
            <CampoEntrada id="txtNome" label="Nome" tipo="text"
                name="nome" value={objeto.nome}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Nome OK" textoinvalido="Informe o nome"
                maximocaracteres={40} />
            <CampoEntrada id="txtHorasJogadas" label="Horas Jogadas" tipo="number"
                name="horas_jogadas" value={objeto.horas_jogadas}
                handlechange={handleChange}
                requerido={true} readonly={false}
                textovalido="Horas jogadas OK" textoinvalido="Informe as horas jogadas"
                maximocaracteres={40} />
            <CampoSelect id="txtGenero" label="Genero"
                name="genero" value={objeto.genero}
                handlechange={handleChange}
                requerido={true}
                textovalido="Genero OK"
                textoinvalido="Informe o genero">
                {
                    listaGeneros.map((cat) => (
                        <option key={cat.codigo} value={cat.codigo}>
                            {cat.nome}
                        </option>
                    ))
                }
            </CampoSelect>
        </Dialogo>
    )
}

export default Form;
