
// localStorage para o xp percorrer a app
var pontos = localStorage.getItem("pontos");
if (pontos == null) { 
    pontos = 300; //apaguem esta linha assim que o localStorage estiver a funcionar com a pagina do temporizador
} else { 
    pontos = parseInt(pontos); 
}

window.onload = function() {
    // isto é para garantir que o xp que aparece no badge é sempre atualizado quando a pagina é carregada
    if (document.getElementById("user-xp")) {
        document.getElementById("user-xp").innerHTML = pontos;
    }

    // lógica da store, se existirem os botões, verifica o estado deles
    if (document.getElementById("btn_wardrobe")) {
        verificarLoja();
    }

    // lógica do quarto, se existirem as imagens, mostra/esconde
    if (document.getElementById("item-wardrobe")) {
        verificarQuarto();
    }
};

// funções da store
function comprarItem(idBtn, custo, nome) {
    if (pontos >= custo) {
        pontos -= custo;
        localStorage.setItem("pontos", pontos);
        localStorage.setItem("item_" + nome, "comprado");
        
        document.getElementById("user-xp").innerHTML = pontos;
        atualizarBotao(idBtn);

        if (nome == "secretaria") { desbloquearPC(); }
    } else {
        alert("Não tem pontos disponiveis");
    }
}


// arrays para os objetos do quarto e para os botões da store
function verificarLoja() {
    var itens = ["roupeiro", "cama", "secretaria", "computador", "tapete", "planta"];
    var btns = ["btn_wardrobe", "btn_bed", "btn_desk", "btn_computer", "btn_rug", "btn_plant"];
    
    for (var i = 0; i < itens.length; i++) {
        if (localStorage.getItem("item_" + itens[i]) == "comprado") {
            atualizarBotao(btns[i]);
        }
    }
    if (localStorage.getItem("item_secretaria") == "comprado") { desbloquearPC(); }
}

function atualizarBotao(id) {
    var b = document.getElementById(id);
    if (b) {
        b.innerHTML = "Adicionado";
        b.style.backgroundColor = "#165c60";
        b.disabled = true;
    }
}

//isto desbloqueia o computador quando a secretária é comprada, ou seja, o user só pode comprar o computador se tiver a secretária
function desbloquearPC() {
    var pc = document.getElementById("btn_computer");
    if (pc && localStorage.getItem("item_computador") != "comprado") {
        pc.disabled = false;
        pc.innerHTML = "Adicionar";
    }
}

//utiliza arrays para mostrar/esconder os itens no quarto, caso os botões da store tenham sido clicados
function verificarQuarto() {
    var itens = ["roupeiro", "cama", "secretaria", "computador", "tapete", "planta"];
    var imgs = ["item-wardrobe", "item-bed", "item-desk", "item-computer", "item-rug", "item-plant"];
    
    for (var i = 0; i < itens.length; i++) {
        var img = document.getElementById(imgs[i]);
        if (localStorage.getItem("item_" + itens[i]) == "comprado") {
            img.style.display = "block";
        } else {
            img.style.display = "none";
        }
    }
}

//Por alguma razao, o LocalStorage não está a funcionar no firefox, apenas no chrome, isto foi para testar
console.log("Página atual: " + window.location.pathname);
console.log("XP lido da memória: " + localStorage.getItem("pontos"));