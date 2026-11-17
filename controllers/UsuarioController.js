const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const usuarioModel =
    require("../models/UsuarioModel");

const limites = {
    nome: 100,
    email: 100,
    telefone: 20,
    cep: 9,
    endereco: 150,
    numero: 10,
    complemento: 100,
    bairro: 100,
    cidade: 100,
    estado: 2,
    login: 50,
    senha: 255
};

const camposObrigatorios = [
    "nome",
    "email",
    "login"
];

const validarDados = (dados) => {

    for (const campo of Object.keys(limites)) {

        const valor = dados[campo];

        if (
            valor !== undefined &&
            valor !== null &&
            String(valor).length > limites[campo]
        ) {

            return `O campo ${campo} permite no máximo ${limites[campo]} caracteres.`;

        }

    }

    for (const campo of camposObrigatorios) {

        if (
            !dados[campo] ||
            !String(dados[campo]).trim()
        ) {

            return `O campo ${campo} é obrigatório.`;

        }

    }

    return null;

};

const criarUsuario = async (req, res) => {

    try {

        const dados = req.body;

        const erroValidacao = validarDados(dados);

        if (erroValidacao) {

            return res.status(400).json({
                mensagem: erroValidacao
            });

        }

        if (!dados.senha || !dados.senha.trim()) {

            return res.status(400).json({
                mensagem: "A senha é obrigatória."
            });

        }

        const senhaHash = await bcrypt.hash(
            dados.senha,
            10
        );

        await usuarioModel.criarUsuario(
            dados.nome,
            dados.email,
            dados.telefone || null,
            dados.cep || null,
            dados.endereco || null,
            dados.numero || null,
            dados.complemento || null,
            dados.bairro || null,
            dados.cidade || null,
            dados.estado || null,
            dados.login,
            senhaHash
        );

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!"
        });

    } catch (erro) {

        console.error(erro);

        if (erro.code === "ER_DUP_ENTRY") {

            return res.status(409).json({
                mensagem: "E-mail ou login já cadastrado."
            });

        }

        res.status(500).json({
            mensagem: "Erro ao cadastrar usuário."
        });

    }

};

const consultarUsuarios = async (req, res) => {

    try {

        const usuarios =
            await usuarioModel.buscarUsuarios();

        res.json(usuarios);

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao consultar usuários."
        });

    }

};

const loginUsuario = async (req, res) => {

    try {

        const { login, senha } = req.body;

        if (!login || !senha) {

            return res.status(400).json({
                mensagem: "Informe login e senha."
            });

        }

        const usuario =
            await usuarioModel.buscarPorLogin(login);

        if (!usuario) {

            return res.status(401).json({
                mensagem: "Login ou senha inválidos."
            });

        }

        const senhaValida =
            await bcrypt.compare(
                senha,
                usuario.senha
            );

        if (!senhaValida) {

            return res.status(401).json({
                mensagem: "Login ou senha inválidos."
            });

        }

        const token = jwt.sign(
            {
                id: usuario.id_usuario,
                login: usuario.login
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        res.json({
            mensagem: "Login realizado com sucesso!",
            token
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao realizar login."
        });

    }

};

const editarUsuario = async (req, res) => {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {

            return res.status(400).json({
                mensagem: "ID de usuário inválido."
            });

        }

        const usuario =
            await usuarioModel.buscarPorId(id);

        if (!usuario) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });

        }

        const dados = req.body;

        const erroValidacao = validarDados(dados);

        if (erroValidacao) {

            return res.status(400).json({
                mensagem: erroValidacao
            });

        }

        let senhaHash = null;

        if (dados.senha) {

            if (dados.senha.length > 255) {

                return res.status(400).json({
                    mensagem: "A senha permite no máximo 255 caracteres."
                });

            }

            senhaHash = await bcrypt.hash(
                dados.senha,
                10
            );

        }

        await usuarioModel.editarUsuario(
            id,
            dados.nome,
            dados.email,
            dados.telefone || null,
            dados.cep || null,
            dados.endereco || null,
            dados.numero || null,
            dados.complemento || null,
            dados.bairro || null,
            dados.cidade || null,
            dados.estado || null,
            dados.login,
            senhaHash
        );

        res.json({
            mensagem: "Usuário atualizado com sucesso!"
        });

    } catch (erro) {

        console.error(erro);

        if (erro.code === "ER_DUP_ENTRY") {

            return res.status(409).json({
                mensagem: "E-mail ou login já utilizado por outro usuário."
            });

        }

        res.status(500).json({
            mensagem: "Erro ao atualizar usuário."
        });

    }

};

const excluirUsuario = async (req, res) => {

    try {

        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {

            return res.status(400).json({
                mensagem: "ID de usuário inválido."
            });

        }

        const usuario =
            await usuarioModel.buscarPorId(id);

        if (!usuario) {

            return res.status(404).json({
                mensagem: "Usuário não encontrado."
            });

        }

        await usuarioModel.excluirUsuario(id);

        res.json({
            mensagem: "Usuário excluído com sucesso!"
        });

    } catch (erro) {

        console.error(erro);

        res.status(500).json({
            mensagem: "Erro ao excluir usuário."
        });

    }

};

module.exports = {
    criarUsuario,
    consultarUsuarios,
    loginUsuario,
    editarUsuario,
    excluirUsuario
};
