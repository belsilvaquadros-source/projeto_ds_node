
const formCadastro =
    document.getElementById("formCadastro");


const campoCep =
    document.getElementById("cep");


const campoTelefone =
    document.getElementById("telefone");

campoTelefone.addEventListener("input", () => {

    let telefone =
        campoTelefone.value.replace(/\D/g, "");

    telefone = telefone.substring(0, 11);

    if (telefone.length > 10) {

        telefone = telefone.replace(
            /^(\d{2})(\d{5})(\d{4}).*/,
            "($1) $2-$3"
        );

    } else if (telefone.length > 6) {

        telefone = telefone.replace(
            /^(\d{2})(\d{4})(\d{0,4}).*/,
            "($1) $2-$3"
        );

    } else if (telefone.length > 2) {

        telefone = telefone.replace(
            /^(\d{2})(\d{0,5})/,
            "($1) $2"
        );

    } else if (telefone.length > 0) {

        telefone = telefone.replace(
            /^(\d*)/,
            "($1"
        );

    }

    campoTelefone.value = telefone;

});

campoCep.addEventListener("input", () => {

    let cep =
        campoCep.value.replace(/\D/g, "");

    cep = cep.substring(0, 8);

    if (cep.length > 5) {

        cep = cep.replace(
            /^(\d{5})(\d{0,3}).*/,
            "$1-$2"
        );

    }

    campoCep.value = cep;

});

document.getElementById("estado")
    .addEventListener("input", (event) => {

        event.target.value =
            event.target.value
                .replace(/[^a-zA-Z]/g, "")
                .toUpperCase()
                .substring(0, 2);

    });

campoCep.addEventListener("blur", async () => {

    const cep =
        campoCep.value.replace(/\D/g, "");

    if (cep.length !== 8) {

        return;
    }

    try {

        const resposta = await fetch(
            `/api/cep/${cep}`
        );

        const dados = await resposta.json();

        if (!resposta.ok) {

            alert(dados.mensagem);

            return;
        }

        document.getElementById("endereco").value =
            dados.logradouro || "";

        document.getElementById("bairro").value =
            dados.bairro || "";

        document.getElementById("cidade").value =
            dados.localidade || "";

        document.getElementById("estado").value =
            dados.uf || "";

    } catch (erro) {

        console.error(erro);

        alert("Erro ao consultar CEP.");

    }

});

formCadastro.addEventListener("submit", async (event) => {

    event.preventDefault();

    const senha =
        document.getElementById("senha").value;

    const confirmacaoSenha =
        document.getElementById("confirmacaoSenha").value;


    if (senha !== confirmacaoSenha) {

        document.getElementById("mensagem").textContent =
            "As senhas não são iguais.";

        return;
    }


    const usuario = {

        nome:
            document.getElementById("nome").value,

        email:
            document.getElementById("email").value,

        telefone:
            campoTelefone.value,

        cep:
            campoCep.value,

        endereco:
            document.getElementById("endereco").value,

        numero:
            document.getElementById("numero").value,

        complemento:
            document.getElementById("complemento").value,

        bairro:
            document.getElementById("bairro").value,

        cidade:
            document.getElementById("cidade").value,

        estado:
            document.getElementById("estado").value,

        login:
            document.getElementById("login").value,

        senha

    };


    try {

        const resposta = await fetch(
            "/api/usuarios",
            {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(usuario)

            }
        );


        const dados =
            await resposta.json();


        const mensagem =
            document.getElementById("mensagem");


        mensagem.textContent =
            dados.mensagem;


        if (resposta.ok) {

            formCadastro.reset();

        }

    } catch (erro) {

        console.error(erro);

        document.getElementById("mensagem").textContent =
            "Erro ao realizar cadastro.";

    }

});
