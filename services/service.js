const consultarCep = async (cep) => {

    const resposta = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
    );

    if (!resposta.ok) {
        throw new Error("Erro ao consultar CEP");
    }

    return await resposta.json();
};

module.exports = {
    consultarCep
};
