var elNome = document.getElementById("nomeUtilizador")
var elUsername = document.getElementById("username")
var elBio = document.getElementById("bio")

if (elNome && elUsername && elBio) {
    elNome.textContent = perfil.nome + " " + perfil.apelido
    elUsername.textContent = "@" + perfil.username
    elBio.textContent = perfil.bio
}