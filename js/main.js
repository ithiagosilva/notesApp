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

    const listaNotas = [];

    function Nota (titulo, corpo) {
        this.titulo = titulo,
        this.corpo = corpo
    }

    function construirNota() {
        let vTitulo = document.getElementById('titulo');
        let vCorpo = document.getElementById('corpo');
        const nota = new Nota(vTitulo.value, vCorpo.value);
        listaNotas.push(nota);
    }

    function criarCard(lista) {
        for (let i = 0; i < lista.length; i++) {
            let liNota = document.createElement('li');
            liNota.setAttribute('class', 'card-nota');
        
            let h1Titulo = document.createElement('h1');
            h1Titulo.innerText = lista[i].titulo;
        
            let pConteudo = document.createElement('p');
            pConteudo.innerText = lista[i].corpo;
        
            liNota.appendChild(h1Titulo);
            liNota.appendChild(pConteudo);
            elements.notas.appendChild(liNota);
        }
    }

    function abrirModal() {
        elements.formulario.style.display = "block";
        elements.msgVazio.style.display = "none";
        elements.btnNovaNota.innerText = "x";
        elements.notas.style.display = "none";
    }

    function fecharModal() {
        elements.formulario.style.display = "none";
        listaNotas === 0 ? elements.msgVazio.style.display = "block" : elements.msgVazio.style.display = "none";
        elements.btnNovaNota.innerText = "+";
        elements.notas.style.display = "flex";
    }

    elements.btnAdd.addEventListener('click', () => {
        fecharModal();
        construirNota();
        criarCard(listaNotas)
    });

    document.addEventListener('keydown', (e) => {
        let tecla = e.key;
        if (tecla === 'Enter' && elements.btnNovaNota.innerText === '+') {
            abrirModal();
        }
    });
});


