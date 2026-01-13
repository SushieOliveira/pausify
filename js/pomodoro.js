// CONFIGURAÇÃO DO TIMER
const TEMPO_FOCO = 25;   // segundos p/teste
const TEMPO_PAUSA = 5;   // segundos p/teste


// VARIÁVEIS DE ESTADO
let tempoTotal = TEMPO_FOCO;
let tempoRestante = TEMPO_FOCO;
let intervalo = null;
let ativo = false;
let emFoco = true;
let atividade = "";
let pausasNoFoco = 0;

let pontos = parseInt(localStorage.getItem("pontos")) || 0;
let historico = JSON.parse(localStorage.getItem("historicoSessoes")) || [];
let notificacaoAtiva = true;


// ELEMENTOS DO DOM
const timerEl = document.getElementById("timer");
const btnStart = document.getElementById("btnStart");
const btnReset = document.getElementById("btnReset");
const btnNotify = document.getElementById("btnNotify");
const historicoEl = document.getElementById("historico");
const pontosEl = document.getElementById("pontos");
const btnAtividades = document.getElementsByClassName("btn-atividade");

const circle = document.querySelector(".progress");
const r = 100;
const circ = 2 * Math.PI * r;
circle.style.strokeDasharray = circ;
circle.style.strokeDashoffset = 0;

const overlay = document.getElementById("overlay");
const popup = document.getElementById("popup");


// FUNÇÕES AUXILIARES
function mostrarPopup(mensagem) {
    popup.textContent = mensagem;
    overlay.classList.add("show");
    overlay.style.display = "flex";

    setTimeout(() => {
        overlay.classList.remove("show");
        setTimeout(() => overlay.style.display = "none", 300);
    }, 2500);
}

function atualizarTimer() {
    let min = Math.floor(tempoRestante / 60);
    let seg = tempoRestante % 60;

    if (min < 10) min = "0" + min;
    if (seg < 10) seg = "0" + seg;

    timerEl.textContent = min + ":" + seg;
    circle.style.strokeDashoffset = circ * (1 - tempoRestante / tempoTotal);
}

// CONTROLO DO TIMER
function iniciarOuPausar() {
    if (atividade === "") {
        mostrarPopup("Selecione uma atividade antes de iniciar!");
        return;
    }

    if (!ativo) {
        ativo = true;
        btnStart.textContent = "PAUSAR";
        btnStart.className = "btn-app btn-pausar";

        intervalo = setInterval(() => {
            tempoRestante--;
            atualizarTimer();

            if (tempoRestante <= 0) {
                proximoCiclo();
            }
        }, 1000);

    } else {
        clearInterval(intervalo);
        ativo = false;
        btnStart.textContent = "RETOMAR";
        btnStart.className = "btn-app btn-iniciar";

        if (emFoco) {
            pausasNoFoco++;
            mostrarPopup("Timer pausado. Pausar reduz o XP.");
        }
    }
}

function proximoCiclo() {
    clearInterval(intervalo);
    ativo = false;

    if (emFoco) {
        let pontosGanhos = 25 - (pausasNoFoco * 5);
        if (pontosGanhos < 5) pontosGanhos = 5;

        pontos += pontosGanhos;
        pontosEl.textContent = pontos;
        localStorage.setItem("pontos", pontos);

        historico.push({
            data: new Date().toLocaleString(),
            atividade: atividade,
            tempo: TEMPO_FOCO,
            pontos: pontosGanhos
        });

        localStorage.setItem("historicoSessoes", JSON.stringify(historico));
        atualizarHistorico();

        mostrarPopup("Fim do foco! +" + pontosGanhos + " XP");

        emFoco = false;
        tempoTotal = TEMPO_PAUSA;
        tempoRestante = TEMPO_PAUSA;
        pausasNoFoco = 0;
        atualizarTimer();
        iniciarOuPausar();

    } else {
        emFoco = true;
        tempoTotal = TEMPO_FOCO;
        tempoRestante = TEMPO_FOCO;
        atualizarTimer();

        btnStart.textContent = "INICIAR";
        btnStart.className = "btn-app btn-iniciar";

        for (let i = 0; i < btnAtividades.length; i++) {
            btnAtividades[i].disabled = false;
            btnAtividades[i].classList.remove("selecionada");
        }

        atividade = "";
        mostrarPopup("Pausa terminada! Prepare-se para o próximo foco.");
    }
}

function reiniciar() {
    clearInterval(intervalo);
    ativo = false;
    emFoco = true;

    tempoTotal = TEMPO_FOCO;
    tempoRestante = TEMPO_FOCO;
    atualizarTimer();

    btnStart.textContent = "INICIAR";
    btnStart.className = "btn-app btn-iniciar";

    for (let i = 0; i < btnAtividades.length; i++) {
        btnAtividades[i].disabled = false;
        btnAtividades[i].classList.remove("selecionada");
    }

    atividade = "";
}


// HISTÓRICO

function atualizarHistorico() {
    historicoEl.innerHTML = "";

    for (let i = historico.length - 1; i >= 0; i--) {
        const item = historico[i];
        const li = document.createElement("li");

        li.textContent =
            item.data + " • " +
            item.atividade + " • " +
            item.tempo + " s • +" +
            item.pontos + " XP";

        historicoEl.appendChild(li);
    }
}

// EVENTOS
btnStart.onclick = iniciarOuPausar;
btnReset.onclick = reiniciar;

btnNotify.onclick = function () {
    notificacaoAtiva = !notificacaoAtiva;
    mostrarPopup(notificacaoAtiva ? "Notificação ativada" : "Notificação desativada");
};

for (let i = 0; i < btnAtividades.length; i++) {
    btnAtividades[i].onclick = function () {
        if (ativo) return;

        for (let j = 0; j < btnAtividades.length; j++) {
            btnAtividades[j].classList.remove("selecionada");
        }

        this.classList.add("selecionada");
        atividade = this.getAttribute("data-atividade");
    };
}

pontosEl.textContent = pontos;
atualizarTimer();
atualizarHistorico();
