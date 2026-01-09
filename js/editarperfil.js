window.addEventListener('DOMContentLoaded', function () {

    document.getElementById("botaonome").value = perfil.nome
    document.getElementById("botaoapelido").value = perfil.apelido
    document.getElementById("botaoidade").value = perfil.idade
    document.getElementById("botaousername").value = perfil.username
    document.getElementById("botaosobreti").value = perfil.bio

    document.getElementById("botaousername").readOnly = true

    document.getElementById("btnGuardar").onclick = function () {
        perfil.nome = document.getElementById("botaonome").value
        perfil.apelido = document.getElementById("botaoapelido").value
        perfil.idade = document.getElementById("botaoidade").value
        perfil.bio = document.getElementById("botaosobreti").value

        window.location.href = "perfil.html"
    }
}
)