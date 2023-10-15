import { getToken } from "../seguranca/Autenticacao";

export const getJogoServico = async () => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogo`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getJogoServicoPorCodigoAPI = async codigo => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogo/${codigo}`,
    {
        method : "GET",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const deleteJogoServico = async codigo => {
    const response = 
    await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogo/${codigo}`,
    {
        method : "DELETE",
        headers : {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}


export const cadastraJogoServico = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/jogo`, {
        method: metodo,
        headers: { "Content-Type": "application/json",
        "authorization" : getToken() },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}