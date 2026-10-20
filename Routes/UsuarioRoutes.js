const express = require("express");
const router = express.Router();

const usuarioController =
    require("../projeto_ds_node/Controllers/UsuarioController");

router.post(
    "/usuario",
    usuarioController.criarUsuario
);

router.get(
   "/usuarios",
    usuarioController.consultarUsuarios
);

router.post(
    "/usuarios",
    usuarioController.consultarUsuarios
);
