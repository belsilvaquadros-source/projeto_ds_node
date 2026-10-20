const express = require("express");
const router = express.Router();

const usuarioController =
    require("../projeto_ds_node/Controllers/UsuarioController");

router.post(
    "/usuarios",
    usuarioController.criarUsuario
);

router.get(
    "/usuarios",
    usuarioController.consultarUsuarios
);

router.post(
    "/usuaros",
    usuarioController.consultarUsuarios
);

router.post(
    "/login",
    usuarioController.login.Usuario
);

module.exports = routes;
