/* Solução Mínima - LabMM3
   Baseada em T11 (DOM) e T12 (Lógica)
*/

// 1. Variável Global de Pontos (Simulação)
// NOTA: Para funcionar entre páginas reais, seria necessário localStorage (fora do programa T10-T15).
var pontos_store = 300; 

// Atualiza o mostrador de XP ao iniciar
window.onload = function() {
    document.getElementById("xp-badge").innerHTML = pontos_store; // 
};

// 2. Função de Compra
function comprarItem(idBotao, custo, tipoItem) { // [cite: 2071]
    
    // Verifica se tem pontos suficientes
    if (pontos_store >= custo) {
        
        // Deduz os pontos
        pontos_store = pontos_store - custo; // [cite: 200]
        
        // Atualiza o HTML do XP
        document.getElementById("user-xp").innerHTML = pontos_store;

        // Altera visual do botão
        var botao = document.getElementById(idBotao); // 
        botao.innerHTML = "Adicionado"; // 
        botao.style.backgroundColor = "#165c60"; // Cor da divisória/fundo do card [cite: 2406]
        botao.disabled = true; // Impede clicar novamente (Boa prática HTML5)

        // Lógica Especial: Secretária desbloqueia Computador
        if (tipoItem == "secretaria") { // [cite: 177]
            desbloquearComputador();
        }

    } else {
        // Feedback negativo
        alert("Não tem pontos disponiveis"); // 
    }
}

// 3. Subalgoritmo para desbloquear o computador
function desbloquearComputador() {
    var btnPC = document.getElementById("btn_computer");
    btnPC.disabled = false; // Remove o bloqueio
    btnPC.innerHTML = "Adicionar"; // Remove o cadeado e põe texto
}