
const formLogin =
    document.getElementById("formLogin");

formLogin.addEventListener("submit", async (event) => {

    event.preventDefault();

    const login =
        document.getElementById("login").value;

    const senha =
        document.getElementById("senha").value;

    const mensagem =
        document.getElementById("mensagem");

    try {

        const resposta = await fetch(
            "/api/login",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    login,
                    senha
                })
            }
        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            mensagem.textContent =
                dados.mensagem;

            return;
        }

        localStorage.setItem(
            "token",
            dados.token
        );

        window.location.href =
            "/controle-usuarios.html";

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Erro ao realizar login.";

    }

});
