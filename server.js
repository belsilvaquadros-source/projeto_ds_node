const express = require("express");

const app = express();

const PORT = 3000;

app.get("/", (req, res ) => {
    res.send("API funcionando!");
});

app.listen(PORT, () => {
    console.log(`servidor iniciado na porta ${PORT}`);
});