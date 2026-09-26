/* =========================================
   INTRO
========================================= */

const intro =
    document.getElementById("intro");

const botaoEntrar =
    document.getElementById("botao-entrar");

const site =
    document.getElementById("site");

const chocolate =
    document.getElementById("chocolate");

const musica =
    document.getElementById("musica");


botaoEntrar.addEventListener("click", () => {

    intro.classList.add("derretendo");


    /* Música começa depois do clique */

    musica.volume = 0.35;

    musica.play();


    document
        .getElementById("play-musica")
        .textContent = "❚❚";

    document
        .getElementById("player-cd")
        .classList.add("tocando");


    setTimeout(() => {

        intro.classList.add("intro-saindo");

        site.classList.add("apareceu");

    }, 1800);


    setTimeout(() => {

        intro.style.display = "none";

    }, 3000);

});



/* =========================================
   PLAYER DE MÚSICA
========================================= */

const playMusica =
    document.getElementById("play-musica");

const playerCd =
    document.getElementById("player-cd");

const volume =
    document.getElementById("volume");


playMusica.addEventListener("click", () => {

    if (musica.paused) {

        musica.play();

        playMusica.textContent = "❚❚";

        playerCd.classList.add("tocando");

    } else {

        musica.pause();

        playMusica.textContent = "▶";

        playerCd.classList.remove("tocando");

    }

});


/* VOLUME */

volume.addEventListener("input", () => {

    musica.volume = volume.value;

});



/* =========================================
   CARRINHO
========================================= */

const botaoCarrinho =
    document.getElementById("carrinho-botao");

const carrinho =
    document.getElementById("carrinho");

const fecharCarrinho =
    document.getElementById("fechar-carrinho");

const contador =
    document.getElementById("contador");

const listaCarrinho =
    document.getElementById("lista-carrinho");

const totalElemento =
    document.getElementById("total");


let itensCarrinho = [];


botaoCarrinho.addEventListener("click", () => {

    carrinho.classList.add("aberto");

});


fecharCarrinho.addEventListener("click", () => {

    carrinho.classList.remove("aberto");

});


carrinho.addEventListener("click", (evento) => {

    if (evento.target === carrinho) {

        carrinho.classList.remove("aberto");

    }

});



/* =========================================
   COMPRAR
========================================= */

const botoesComprar =
    document.querySelectorAll(".comprar");


botoesComprar.forEach((botao) => {

    botao.addEventListener("click", () => {

        const nome =
            botao.dataset.nome;

        const preco =
            Number(botao.dataset.preco);


        itensCarrinho.push({

            nome: nome,

            preco: preco

        });


        atualizarCarrinho();

        carrinho.classList.add("aberto");

    });

});



/* =========================================
   ATUALIZAR CARRINHO
========================================= */

function atualizarCarrinho() {

    contador.textContent =
        itensCarrinho.length;


    if (itensCarrinho.length === 0) {

        listaCarrinho.innerHTML =
            "<p>Seu carrinho está vazio ♡</p>";

        totalElemento.textContent =
            "R$ 0,00";

        return;

    }


    listaCarrinho.innerHTML = "";


    let total = 0;


    itensCarrinho.forEach((item) => {

        total += item.preco;


        const elemento =
            document.createElement("div");

        elemento.classList.add(
            "item-carrinho"
        );


        elemento.innerHTML = `

            <span>
                ${item.nome}
            </span>

            <strong>
                R$ ${item.preco
                    .toFixed(2)
                    .replace(".", ",")}
            </strong>

        `;


        listaCarrinho.appendChild(elemento);

    });


    totalElemento.textContent =
        `R$ ${total
            .toFixed(2)
            .replace(".", ",")}`;

}



/* =========================================
   ANIMAÇÃO DOS CARDS
========================================= */

const cards =
    document.querySelectorAll(".card-doce");


const observador =
    new IntersectionObserver(

        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.style.opacity =
                        "1";

                    entrada.target.style.transform =
                        "translateY(0)";

                }

            });

        },

        {
            threshold: .15
        }

    );


cards.forEach((card) => {

    card.style.opacity = "0";

    card.style.transform =
        "translateY(30px)";

    card.style.transition =
        "opacity .6s ease, transform .6s ease";

    observador.observe(card);

});



/* =========================================
   SISTEMA DE EASTER EGGS
========================================= */

const popup =
    document.getElementById("popup-segredo");

const popupTexto =
    document.getElementById("popup-texto");

const popupEmoji =
    document.getElementById("popup-emoji");

const fecharPopup =
    document.getElementById("fechar-popup");


function mostrarSegredo(emoji, texto) {

    popupEmoji.textContent = emoji;

    popupTexto.textContent = texto;

    popup.classList.add("aberto");

}


fecharPopup.addEventListener("click", () => {

    popup.classList.remove("aberto");

});


popup.addEventListener("click", (evento) => {

    if (evento.target === popup) {

        popup.classList.remove("aberto");

    }

});



/* =========================================
   EASTER EGG 1
   CLICAR NO MORANGO
========================================= */

const morango =
    document.getElementById("morango-secreto");


morango.addEventListener("click", () => {

    mostrarSegredo(

        "🍓",

        "Psst... você encontrou o moranguinho! Ele estava escondido aqui o tempo todo 1/4 ♡"

    );

});



/* =========================================
   EASTER EGG 2
   CLICAR 5 VEZES NO LOGO
========================================= */

const logo =
    document.getElementById("logo-secreto");

let cliquesLogo = 0;


logo.addEventListener("click", () => {

    cliquesLogo++;


    if (cliquesLogo === 5) {

        mostrarSegredo(

            "🍰",

            "VOCÊ DESBLOQUEOU O BOLO SECRETO! Parabéns, explorador(a)! 2/4 ✨"

        );

        cliquesLogo = 0;

    }

});



/* =========================================
   EASTER EGG 3
   CLICAR NO FOOTER 3 VEZES
========================================= */

const footer =
    document.getElementById("segredo-footer");

let cliquesFooter = 0;


footer.addEventListener("click", () => {

    cliquesFooter++;


    if (cliquesFooter === 3) {

        mostrarSegredo(

            "🐻",

            "Você encontrou o cantinho secreto do mascote! ♡ Talvez ele esteja preparando sua encomenda... 3/4"

        );

        cliquesFooter = 0;

    }

});



/* =========================================
   EASTER EGG 4
   TECLA SECRETA
========================================= */

let codigo = "";


document.addEventListener("keydown", (evento) => {

    codigo += evento.key.toLowerCase();


    /*
       Digite "doce"
       em qualquer lugar do site.
    */

    if (codigo.includes("doce")) {

        mostrarSegredo(

            "🤫",

            "Código secreto ativado! Você descobriu um segredo do site 4/4 ✨"

        );


        codigo = "";

    }


    /*
       Evita que a string fique gigante.
    */

    if (codigo.length > 20) {

        codigo =
            codigo.slice(-10);

    }

});

