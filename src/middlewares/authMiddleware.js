const jwt = require("jsonwebtoken");

const autenticar = (req, res, next) => {

    const cabecalho =
        req.headers.authorization;


    if (!cabecalho) {

        return res.status(401).json({
            mensagem: "Token não informado."
        });

    }


    const partes = cabecalho.split(" ");


    const token = partes[1];


    if (!token) {

        return res.status(401).json({
            mensagem: "Token inválido."
        });

    }


    try {

        const usuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        req.usuario = usuario;

        next();

    } catch (erro) {

        return res.status(401).json({
            mensagem: "Token inválido ou expirado."
        });

    }
};


module.exports = autenticar;
