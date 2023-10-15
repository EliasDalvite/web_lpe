import { getToken } from "../seguranca/Autenticacao";

export const getGeneroServico = async () => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/genero`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}

export const getGeneroServicoPorCodigoAPI = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/genero/${codigo}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}

export const deleteGeneroServico = async codigo => {
    const response =
        await fetch(`${process.env.REACT_APP_ENDERECO_API}/genero/${codigo}`,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": getToken()
                }
            });
    const data = await response.json();
    return data;
}


export const cadastraGeneroServico = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/genero`, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken()
        },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}