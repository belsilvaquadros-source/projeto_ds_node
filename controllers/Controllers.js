const apiService =
    require("../services/Service");


const consultarCep = async (req, res) => {

    try {

        const { cep } = req.params;


        if (!cep) {

            return res.status(400).json({
                mensagem: "CEP não informado."
            });

        }


        const endereco =
            await apiService.consultarCep(cep);


        if (endereco.erro) {

            return res.status(404).json({
                mensagem: "CEP não encontrado."
            });

        }


        res.json(endereco);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao consultar CEP."
        });

    }
};


module.exports = {
    consultarCep
};
