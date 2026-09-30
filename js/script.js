// ========================================
// ONG ESPERANÇA - script.js
// ========================================


// ========================================
// 1. MENU RESPONSIVO
// Evento de clique
// ========================================

const botaoMenu = document.querySelector(".menu-toggle");
const menu = document.querySelector("nav");

if (botaoMenu && menu) {

    botaoMenu.addEventListener("click", function () {

        menu.classList.toggle("ativo");

        const aberto = menu.classList.contains("ativo");

        botaoMenu.setAttribute(
            "aria-expanded",
            aberto
        );

    });

}


// ========================================
// 2. FORMULÁRIO
// Eventos input e submit
// ========================================

const formulario = document.querySelector("form");

if (formulario) {

    const campos = formulario.querySelectorAll("input");

    campos.forEach(function (campo) {

        campo.addEventListener("input", function () {

            if (campo.checkValidity()) {

                campo.classList.remove("erro");
                campo.classList.add("sucesso");

            } else {

                campo.classList.remove("sucesso");
                campo.classList.add("erro");

            }

        });

    });


    formulario.addEventListener("submit", function (event) {

        // Impede o recarregamento da página
        event.preventDefault();

        if (formulario.checkValidity()) {

            salvarDados();

            alert("Cadastro enviado com sucesso!");

        } else {

            alert("Preencha os campos corretamente.");

        }

    });

}


// ========================================
// 3. LOCALSTORAGE
// JSON.stringify e JSON.parse
// ========================================

function salvarDados() {

    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");
    const cidade = document.querySelector("#cidade");

    const dados = {

        nome: nome ? nome.value : "",
        email: email ? email.value : "",
        cidade: cidade ? cidade.value : ""

    };

    localStorage.setItem(
        "cadastro",
        JSON.stringify(dados)
    );

}


// Recupera os dados ao carregar a página

function carregarDados() {

    const dadosSalvos = localStorage.getItem("cadastro");

    if (dadosSalvos) {

        const dados = JSON.parse(dadosSalvos);

        const nome = document.querySelector("#nome");
        const email = document.querySelector("#email");
        const cidade = document.querySelector("#cidade");

        if (nome) {
            nome.value = dados.nome || "";
        }

        if (email) {
            email.value = dados.email || "";
        }

        if (cidade) {
            cidade.value = dados.cidade || "";
        }

    }

}

carregarDados();


// ========================================
// 4. PROJETOS DINÂMICOS
// Array + forEach + Template Literal
// ========================================

const projetos = [

    {
        titulo: "Educação para Todos",
        descricao: "Atividades educativas e reforço escolar.",
        imagem: "../img/projeto-educacao.jpg"
    },

    {
        titulo: "Alimentação Solidária",
        descricao: "Arrecadação e distribuição de alimentos.",
        imagem: "../img/alimentacao-solidaria.jpg"
    }

];


const listaProjetos = document.querySelector("#lista-projetos");

if (listaProjetos) {

    projetos.forEach(function (projeto) {

        listaProjetos.innerHTML += `

            <article class="card">

                <img
                    src="${projeto.imagem}"
                    alt="${projeto.titulo}"
                >

                <h3>${projeto.titulo}</h3>

                <p>${projeto.descricao}</p>

            </article>

        `;

    });

}


// ========================================
// 5. NAVEGAÇÃO SPA
// DOM + preventDefault + history.pushState
//
// Só será usada em links que tenham
// a classe "spa-link"
// ========================================

const linksSpa = document.querySelectorAll(".spa-link");
const conteudoPrincipal = document.querySelector("main");

linksSpa.forEach(function (link) {

    link.addEventListener("click", function (event) {

        event.preventDefault();

        const pagina = link.getAttribute("href");

        history.pushState(
            {},
            "",
            pagina
        );

        if (conteudoPrincipal) {

            conteudoPrincipal.innerHTML = `

                <section>

                    <h2>Conteúdo atualizado</h2>

                    <p>
                        O conteúdo foi alterado utilizando
                        JavaScript e manipulação do DOM.
                    </p>

                </section>

            `;

        }

    });

});