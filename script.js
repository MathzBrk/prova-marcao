window.onload = () => {
    const lista = localStorage.getItem("usuarios");

    if(lista === null) {
        localStorage.setItem("usuarios", JSON.stringify(
            [
                {
                    nome: "Matheus",
                    email: "matheus@email.com",
                    cpf: "000.000.000-00",
                    nascimento: "29/08/2002"

                }
            ]
        ))
    }

    mostrarLista();
}

const formulario = pegarFormulario();

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    const nomeInput = document.getElementById("nome");
    const emailInput = document.getElementById("email");
    const cpfInput = document.getElementById("cpf");
    const nascimentoInput = document.getElementById("nascimento");

    cadastrarUsuario(nomeInput.value, emailInput.value, cpfInput.value, nascimentoInput.value)

    mostrarLista();

});

function excluirUsuario(nome) {
    const usuarios = devolverListaComoArray();
    const novosUsuarios = usuarios.filter((usuario) => usuario.nome !== nome);
    localStorage.setItem("usuarios", JSON.stringify(novosUsuarios));
    mostrarLista();
}

function mostrarLista(){
    const listaDeUsuarios = devolverListaComoArray();

    const tbody = document.getElementById("tabelaUsuarios");
    tbody.innerHTML = "";

    listaDeUsuarios.forEach((usuario, index) => {
        const tr = document.createElement("tr");
        const tdNome = document.createElement("td")
        tdNome.innerText = usuario.nome;

        const tdEmail = document.createElement("td")
        tdEmail.innerText = usuario.email;

        const tdCpf = document.createElement("td")
        tdCpf.innerText = usuario.cpf;

        const tdNascimento = document.createElement("td")
        tdNascimento.innerText = usuario.nascimento;

        const tdAcoes = document.createElement("td");
        const botao = document.createElement("button");
        botao.innerText = "Excluir";
        botao.addEventListener("click", () => {
            excluirUsuario(usuario.nome);
        });
        tdAcoes.append(botao);

        tr.append(tdNome);
        tr.append(tdEmail);
        tr.append(tdCpf);
        tr.append(tdNascimento);
        tr.append(tdAcoes);

        tbody.append(tr);
    });
}

function cadastrarUsuario(nome, email, cpf, nascimento){
    const regexEmail = /^[a-z0-9._-]+@[a-z0-9]+\.[a-z]{2,}$/i;
    const regexCpf = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

    const nomeErro = document.getElementById("erroNome");
    const emailErro = document.getElementById("erroEmail");
    const cpfErro = document.getElementById("erroCPF");
    const nascimentoErro = document.getElementById("erroNascimento");

    nomeErro.innerText = "";
    emailErro.innerText = "";
    cpfErro.innerText = "";
    nascimentoErro.innerText = "";

    if(nome === ""){
        nomeErro.innerText = "Atributo obrigatório";
        return false;
    }

    if(nascimento === ""){
        nascimentoErro.innerText = "Atributo obrigatório";
        return false;
    }

    if(email === "") {
        emailErro.innerText = "Atributo obrigatório";
        return false;
    }

    
    if(cpf === "") {
        cpfErro.innerText = "Atributo obrigatório";
        return false;
    }


    if(!regexEmail.test(email)){
        emailErro.innerText = "O email deve seguir o formato: aluno@email.com";
        return false;
    }

    if(!regexCpf.test(cpf)) {
        cpfErro.innerText = "O cpf deve seguir o formato 000.000.000-00";
        return false;
    }

    const usuario = {
        nome: nome,
        email: email,
        cpf: cpf,
        nascimento: nascimento
    }

    const listaDeUsuarios = devolverListaComoArray();
    listaDeUsuarios.push(usuario);

    localStorage.setItem("usuarios", JSON.stringify(listaDeUsuarios));

}



function pegarFormulario(){
    const formulario = document.getElementById("formCadastro");

    if(!formulario) console.log("erro, formulario está vazio");
    else console.log("peguei o form")

    return formulario;
}

function devolverListaComoArray(){
    const lista = JSON.parse(localStorage.getItem("usuarios"));
    if(lista === null) console.log("lista vazia");
    else console.log(lista)

    return lista;
}