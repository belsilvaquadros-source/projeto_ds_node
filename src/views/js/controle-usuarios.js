
const token = localStorage.getItem("token");

const listaUsuarios =
    document.getElementById("listaUsuarios");

const mensagem =
    document.getElementById("mensagem");

const formEdicao =
    document.getElementById("formEdicao");

if (!token) {

    window.location.href = "/";

}

const requisicao = async (url, opcoes = {}) => {

    const resposta = await fetch(url, {

        ...opcoes,

        headers: {
            ...opcoes.headers,
            "Authorization": `Bearer ${token}`
        }

    });

    if (resposta.status === 401) {

        localStorage.removeItem("token");

        window.location.href = "/";

        throw new Error("Sessão expirada.");

    }

    return resposta;

};

const carregarUsuarios = async () => {

    try {

        const resposta = await requisicao(
            "/api/usuarios"
        );

        const usuarios = await resposta.json();

        if (!resposta.ok) {

            mensagem.textContent =
                usuarios.mensagem;

            return;
        }

        listaUsuarios.innerHTML = "";

        usuarios.forEach(usuario => {

            const linha =
                document.createElement("tr");

            const colunaId =
                document.createElement("td");

            colunaId.textContent =
                usuario.id_usuario;

            const colunaNome =
                document.createElement("td");

            colunaNome.textContent =
                usuario.nome;

            const colunaEmail =
                document.createElement("td");

            colunaEmail.textContent =
                usuario.email;

            const colunaTelefone =
                document.createElement("td");

            colunaTelefone.textContent =
                usuario.telefone || "";

            const colunaLogin =
                document.createElement("td");

            colunaLogin.textContent =
                usuario.login;

            const colunaAcoes =
                document.createElement("td");

            const btnEditar =
                document.createElement("button");

            btnEditar.textContent =
                "Editar";

            btnEditar.type = "button";

            btnEditar.addEventListener("click", () => {

                editarUsuario(usuario);

            });

            const btnExcluir =
                document.createElement("button");

            btnExcluir.textContent =
                "Excluir";

            btnExcluir.type = "button";

            btnExcluir.addEventListener("click", () => {

                excluirUsuario(usuario.id_usuario);

            });

            colunaAcoes.appendChild(btnEditar);

            colunaAcoes.appendChild(btnExcluir);

            linha.appendChild(colunaId);

            linha.appendChild(colunaNome);

            linha.appendChild(colunaEmail);

            linha.appendChild(colunaTelefone);

            linha.appendChild(colunaLogin);

            linha.appendChild(colunaAcoes);

            listaUsuarios.appendChild(linha);

        });

        if (usuarios.length === 0) {

            mensagem.textContent =
                "Nenhum usuário cadastrado.";

        } else {

            mensagem.textContent =
                `${usuarios.length} usuário(s) encontrado(s).`;

        }

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            erro.message || "Erro ao carregar usuários.";

    }

};

const editarUsuario = (usuario) => {

    document.getElementById("idUsuario").value =
        usuario.id_usuario;

    document.getElementById("nome").value =
        usuario.nome || "";

    document.getElementById("email").value =
        usuario.email || "";

    document.getElementById("telefone").value =
        usuario.telefone || "";

    document.getElementById("cep").value =
        usuario.cep || "";

    document.getElementById("endereco").value =
        usuario.endereco || "";

    document.getElementById("numero").value =
        usuario.numero || "";

    document.getElementById("complemento").value =
        usuario.complemento || "";

    document.getElementById("bairro").value =
        usuario.bairro || "";

    document.getElementById("cidade").value =
        usuario.cidade || "";

    document.getElementById("estado").value =
        usuario.estado || "";

    document.getElementById("login").value =
        usuario.login || "";

    document.getElementById("senha").value = "";

    formEdicao.hidden = false;

    formEdicao.scrollIntoView({
        behavior: "smooth"
    });

};

formEdicao.addEventListener("submit", async (event) => {

    event.preventDefault();

    const id =
        document.getElementById("idUsuario").value;

    const usuario = {

        nome:
            document.getElementById("nome").value,

        email:
            document.getElementById("email").value,

        telefone:
            document.getElementById("telefone").value,

        cep:
            document.getElementById("cep").value,

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

        senha:
            document.getElementById("senha").value

    };

    try {

        const resposta = await requisicao(
            `/api/usuarios/${id}`,
            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(usuario)

            }
        );

        const dados = await resposta.json();

        mensagem.textContent =
            dados.mensagem;

        if (resposta.ok) {

            formEdicao.reset();

            formEdicao.hidden = true;

            await carregarUsuarios();

        }

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Erro ao atualizar usuário.";

    }

});

document.getElementById("btnCancelar")
    .addEventListener("click", () => {

        formEdicao.reset();

        formEdicao.hidden = true;

    });

const excluirUsuario = async (id) => {

    const confirmar = confirm(
        "Deseja realmente excluir este usuário?"
    );

    if (!confirmar) {

        return;

    }

    try {

        const resposta = await requisicao(
            `/api/usuarios/${id}`,
            {
                method: "DELETE"
            }
        );

        const dados = await resposta.json();

        mensagem.textContent =
            dados.mensagem;

        if (resposta.ok) {

            await carregarUsuarios();

        }

    } catch (erro) {

        console.error(erro);

        mensagem.textContent =
            "Erro ao excluir usuário.";

    }

};

document.getElementById("btnSair")
    .addEventListener("click", () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    });

if (token) {

    carregarUsuarios();

}
