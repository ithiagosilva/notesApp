import { getElements } from "./dom.js";

document.addEventListener('DOMContentLoaded', () => {
    const elements = getElements();

    elements.formulario.addEventListener('submit', (e) => {
        e.preventDefault();
    });

    elements.btnNovaNota.addEventListener("click", () => {
        if (elements.btnNovaNota.innerText === "+") {
            abrirModal();
        } else {
            fecharModal();
        }
    });

    let listaNotas = [];

    function Nota (titulo, corpo) {
        this.titulo = titulo,
        this.corpo = corpo
    }

    function construirNota() {
        const nota = new Nota(elements.vTitulo.value, elements.vCorpo.value);
        listaNotas.push(nota);
    }

    function criarCard(lista) {
        elements.notas.innerHTML = "";
        for (let i = 0; i < lista.length; i++) {
            let liNota = document.createElement('li');
            liNota.setAttribute('class', 'card-nota');
        
            let h1Titulo = document.createElement('h1');
            h1Titulo.innerText = lista[i].titulo;
        
            let pConteudo = document.createElement('p');
            pConteudo.innerText = lista[i].corpo;

            let btnApagar = document.createElement('button');
            btnApagar.setAttribute('class', 'btn-apagar');
            btnApagar.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 12L14 16M14 12L10 16M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                    </svg>`;
            
            liNota.appendChild(h1Titulo);
            liNota.appendChild(pConteudo);
            liNota.appendChild(btnApagar);
            elements.notas.appendChild(liNota);

            btnApagar.addEventListener('click', () => {
                elements.notas.removeChild(liNota);
                listaNotas.splice(i, 1);
                salvarNota();
                comportamentoMural();
            });
            salvarNota();
            comportamentoMural();
        }
    }

    function comportamentoMural() {
        if (listaNotas.length === 0) {
            elements.msgVazio.style.display = "block";
            elements.mural.classList.remove('notes-wall-alt');
        } else {
            elements.msgVazio.style.display = "none";
            elements.mural.classList.add('notes-wall-alt');
        }
    };

    function abrirModal() {
        elements.formulario.style.display = "block";
        elements.msgVazio.style.display = "none";
        elements.btnNovaNota.innerText = "x";
        elements.notas.style.display = "none";
    }

    function fecharModal() {
        elements.formulario.style.display = "none";
        elements.btnNovaNota.innerText = "+";
        elements.notas.style.display = "flex";
        listaNotas.length === 0 ? elements.msgVazio.style.display = "block" : elements.msgVazio.style.display = "none";
    }

    function limparInputs() {
        elements.vTitulo.value = "";
        elements.vCorpo.value = "";
    }

    elements.btnAdd.addEventListener('click', () => {
        fecharModal();
        construirNota();
        criarCard(listaNotas);
        limparInputs();
    });

    document.addEventListener('keydown', (e) => {
        let tecla = e.key;
        if (tecla === 'Enter' && elements.btnNovaNota.innerText === '+') {
            abrirModal();
        }
    });

    function salvarNota() {
        let listaJSON = JSON.stringify(listaNotas);
        localStorage.setItem('notas', listaJSON);
    }
    function exibirNotasSalvas() {
        let listaRecuperada = localStorage.getItem('notas');
        listaNotas = JSON.parse(listaRecuperada);
        criarCard(listaNotas);
        salvarNota();
    }
    if (localStorage.getItem('notas') && elements.notas.childNodes.length > 0) {
        exibirNotasSalvas();
    }

    elements.desenvolvido.innerHTML = `Desenvolvido por <a href="https://ithiagosilva.netlify.app" target="_blank" rel="noopener noreferrer">Thiago Silva</a> &copy; ${new Date().getFullYear()}`
});


