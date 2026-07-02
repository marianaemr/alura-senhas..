```javascript
// ===== Elementos da página =====
const campoSenha = document.getElementById("campo-senha");
const btnMais = document.getElementById("aumentar");
const btnMenos = document.getElementById("diminuir");
const textoTamanho = document.getElementById("valor");

const chkMaiusculas = document.getElementById("maiusculas");
const chkMinusculas = document.getElementById("minusculas");
const chkNumeros = document.getElementById("numeros");
const chkSimbolos = document.getElementById("simbolos");

const barraForca = document.getElementById("forca");
const textoEntropia = document.querySelector(".entropia");

// ===== Configuração inicial =====
let tamanhoSenha = 12;

// Conjuntos de caracteres
const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%&*()_-+=[]{}<>?/|";

// Atualiza o número exibido
function atualizarTamanho() {
    textoTamanho.textContent = tamanhoSenha;
}

// Gera um número aleatório
function aleatorio(max) {
    return Math.floor(Math.random() * max);
}

// ===== Geração da senha =====
function gerarSenha() {

    let alfabeto = "";

    if (chkMaiusculas.checked) alfabeto += letrasMaiusculas;
    if (chkMinusculas.checked) alfabeto += letrasMinusculas;
    if (chkNumeros.checked) alfabeto += numeros;
    if (chkSimbolos.checked) alfabeto += simbolos;

    // Evita gerar senha sem caracteres disponíveis
    if (alfabeto.length === 0) {
        campoSenha.value = "";
        barraForca.className = "forca fraca";
        textoEntropia.textContent =
            "Selecione pelo menos uma característica.";
        return;
    }

    let senha = "";

    for (let i = 0; i < tamanhoSenha; i++) {
        senha += alfabeto[aleatorio(alfabeto.length)];
    }

    campoSenha.value = senha;

    classificarSenha(alfabeto.length);
}

// ===== Classificação da força =====
function classificarSenha(tamanhoAlfabeto) {

    const entropia =
        tamanhoSenha * Math.log2(tamanhoAlfabeto);

    barraForca.classList.remove(
        "fraca",
        "media",
        "forte"
    );

    if (entropia > 57) {
        barraForca.classList.add("forte");
    } else if (entropia > 35) {
        barraForca.classList.add("media");
    } else {
        barraForca.classList.add("fraca");
    }

    const combinacoes = Math.pow(
        tamanhoAlfabeto,
        tamanhoSenha
    );

    textoEntropia.textContent =
        "Entropia: " +
        entropia.toFixed(2) +
        " bits | Combinações: " +
        combinacoes.toLocaleString("pt-BR");
}

// ===== Botões =====
btnMais.addEventListener("click", () => {
    if (tamanhoSenha < 30) {
        tamanhoSenha++;
        atualizarTamanho();
        gerarSenha();
    }
});

btnMenos.addEventListener("click", () => {
    if (tamanhoSenha > 4) {
        tamanhoSenha--;
        atualizarTamanho();
        gerarSenha();
    }
});

// ===== Checkboxes =====
[
    chkMaiusculas,
    chkMinusculas,
    chkNumeros,
    chkSimbolos
].forEach((checkbox) => {
    checkbox.addEventListener("change", gerarSenha);
});

// ===== Inicialização =====
atualizarTamanho();
gerarSenha();
```
