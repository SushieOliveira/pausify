// ================= POPUP =================
var overlay = document.createElement('div');
overlay.id = 'overlay';
overlay.style.position = 'fixed';
overlay.style.top = '0';
overlay.style.left = '0';
overlay.style.width = '100%';
overlay.style.height = '100%';
overlay.style.display = 'none';
overlay.style.justifyContent = 'center';
overlay.style.alignItems = 'center';
overlay.style.background = 'rgba(0,0,0,0.3)';
overlay.style.zIndex = '1000';
overlay.style.pointerEvents = 'none';

var popup = document.createElement('div');
popup.id = 'popup';
popup.style.backgroundColor = '#0a5c60';
popup.style.color = '#fff';
popup.style.padding = '20px 30px';
popup.style.borderRadius = '15px';
popup.style.fontWeight = '700';
popup.style.fontSize = '1rem';
popup.style.opacity = 0;
popup.style.transform = 'translateY(-20px)';
popup.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
popup.style.pointerEvents = 'all';
popup.style.textAlign = 'center';

overlay.appendChild(popup);
document.body.appendChild(overlay);

function mostrarPopup(mensagem){
    popup.textContent = mensagem;
    overlay.style.display = 'flex';
    setTimeout(() => {
        popup.style.opacity = 1;
        popup.style.transform = 'translateY(0)';
    }, 10);
    setTimeout(() => {
        popup.style.opacity = 0;
        popup.style.transform = 'translateY(-20px)';
        setTimeout(() => { overlay.style.display = 'none'; }, 300);
    }, 2500);
}

// ================= PONTOS =================
var pontos = localStorage.getItem("pontos");

if (!pontos) {
    pontos =550; // valor inicial
} else {
    pontos = parseInt(pontos);
}

function atualizarPontuacao() {
    var spanPontos = document.getElementById("pontos");
    if (spanPontos) spanPontos.textContent = pontos;

    var spanUserXP = document.getElementById("user-xp");
    if (spanUserXP) spanUserXP.textContent = pontos;
}

// ================= LOAD =================
window.onload = function () {
    atualizarPontuacao();

    if (document.getElementById("btn_wardrobe") ||
        document.getElementById("btn_bed") ||
        document.getElementById("btn_desk") ||
        document.getElementById("btn_computer") ||
        document.getElementById("btn_rug") ||
        document.getElementById("btn_plant")) {
        verificarLoja();
    }

    if (document.getElementById("item-wardrobe") ||
        document.getElementById("item-bed") ||
        document.getElementById("item-desk") ||
        document.getElementById("item-computer") ||
        document.getElementById("item-rug") ||
        document.getElementById("item-plant")) {
        verificarQuarto();
    }
};

// ================= LOJA =================
function comprarItem(idBtn, custo, nome) {
    if (pontos >= custo) {
        pontos -= custo;
        localStorage.setItem("pontos", pontos);
        localStorage.setItem("item_" + nome, "comprado");

        atualizarPontuacao();
        atualizarBotao(idBtn);

        if (nome === "secretaria") desbloquearPC();
    } else {
        mostrarPopup("Não tem pontos disponíveis"); // substitui alert
    }
}

function verificarLoja() {
    var itens = ["roupeiro", "cama", "secretaria", "computador", "tapete", "planta"];
    var btns = ["btn_wardrobe", "btn_bed", "btn_desk", "btn_computer", "btn_rug", "btn_plant"];

    for (var i = 0; i < itens.length; i++) {
        if (localStorage.getItem("item_" + itens[i]) === "comprado") {
            atualizarBotao(btns[i]);
        }
    }

    if (localStorage.getItem("item_secretaria") === "comprado") {
        desbloquearPC();
    }
}

function atualizarBotao(id) {
    var b = document.getElementById(id);
    if (b) {
        b.innerHTML = "Adicionado";
        b.style.backgroundColor = "#165c60";
        b.disabled = true;
    }
}

function desbloquearPC() {
    var pc = document.getElementById("btn_computer");
    if (pc && localStorage.getItem("item_computador") !== "comprado") {
        pc.disabled = false;
        pc.innerHTML = "Adicionar";
    }
}

// ================= QUARTO =================
function verificarQuarto() {
    var itens = ["roupeiro", "cama", "secretaria", "computador", "tapete", "planta"];
    var imgs = ["item-wardrobe", "item-bed", "item-desk", "item-computer", "item-rug", "item-plant"];

    for (var i = 0; i < itens.length; i++) {
        var img = document.getElementById(imgs[i]);
        if (img) {
            img.style.display = (localStorage.getItem("item_" + itens[i]) === "comprado") ? "block" : "none";
        }
    }
}

// ================= DEBUG =================
console.log("Página atual: " + window.location.pathname);
console.log("XP lido da memória: " + pontos);
