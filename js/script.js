// ================= FUNÇÃO DE POPUP =================
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

// ================= SLIDER DE IDADE =================
var idadeSlider = document.getElementById('idade');
var idadeValor = document.getElementById('idadeValor');

if (idadeSlider && idadeValor) {
    idadeValor.textContent = idadeSlider.value;
    idadeSlider.addEventListener('input', function () {
        idadeValor.textContent = idadeSlider.value;
    });
}

// ================= AVATARES =================
var avatarsContainer = document.getElementById('avatars');
var avatarSelecionado = null;
var uploadInput = document.getElementById('uploadAvatar');

if (avatarsContainer && uploadInput) {

    function selecionarAvatar(avatar) {
        var todosAvatares = avatarsContainer.querySelectorAll('.avatar');
        todosAvatares.forEach(a => a.classList.remove('selecionado'));
        avatar.classList.add('selecionado');
        avatarSelecionado = avatar.querySelector('img').src;
    }

    // Avatares pré-definidos
    var avataresPredefinidos = avatarsContainer.querySelectorAll('.avatar');
    avataresPredefinidos.forEach(a => a.addEventListener('click', function () {
        selecionarAvatar(this);
    }));

    // Upload de avatar
    uploadInput.addEventListener('change', function () {
        if (avatarsContainer.querySelectorAll('.avatar.uploaded').length > 0) {
            mostrarPopup("Só pode adicionar 1 avatar carregado!");
            return;
        }

        var file = this.files[0];
        if (!file) return;

        var reader = new FileReader();
        reader.onload = function (e) {
            var novoAvatar = document.createElement('div');
            novoAvatar.classList.add('avatar', 'uploaded');

            var img = document.createElement('img');
            img.src = e.target.result;
            novoAvatar.appendChild(img);

            var deleteBtn = document.createElement('button');
            deleteBtn.classList.add('delete-btn');
            deleteBtn.addEventListener('click', function (ev) {
                ev.stopPropagation();
                avatarsContainer.removeChild(novoAvatar);
                avatarSelecionado = null;
                uploadInput.value = '';
            });

            novoAvatar.appendChild(deleteBtn);
            avatarsContainer.appendChild(novoAvatar);

            novoAvatar.addEventListener('click', function () {
                selecionarAvatar(this);
            });

            selecionarAvatar(novoAvatar);
        };
        reader.readAsDataURL(file);
    });
}

// ================= BOTÃO SEGUINTE (REGISTO1.HTML) =================
var btnSeguinte = document.getElementById('btnSeguinte');
if (btnSeguinte) {
    btnSeguinte.addEventListener('click', function () {
        var ensinoSelecionado = document.querySelector('input[name="ensino"]:checked');
        ensinoSelecionado = ensinoSelecionado ? ensinoSelecionado.id : null;

        var dadosPessoais = {
            nome: document.getElementById('nome').value.trim(),
            apelido: document.getElementById('apelido').value.trim(),
            idade: idadeSlider ? idadeSlider.value : null,
            ensino: ensinoSelecionado,
            avatar: avatarSelecionado
        };

        if (!dadosPessoais.nome || !dadosPessoais.apelido || !dadosPessoais.idade || !dadosPessoais.ensino) {
            mostrarPopup("Preencha todos os dados antes de continuar!");
            return;
        }

        localStorage.setItem('dadosPessoais', JSON.stringify(dadosPessoais));
        window.location.href = 'registo2.html';
    });
}

// ================= BOTÃO CRIAR CONTA (REGISTO2.HTML) =================
var btnCriar = document.getElementById('btnCriar');
if (btnCriar) {
    btnCriar.addEventListener('click', function () {
        var user = document.getElementById('user').value.trim();
        var pass = document.getElementById('pass').value.trim();

        if (!user || !pass) {
            mostrarPopup('Preencha username e password!');
            return;
        }

        var dadosPessoais = JSON.parse(localStorage.getItem('dadosPessoais'));
        if (!dadosPessoais) {
            mostrarPopup('Preencha primeiro os dados pessoais!');
            return;
        }

        var utilizadores = JSON.parse(localStorage.getItem('utilizadores')) || [];

        if (utilizadores.some(u => u.login === user)) {
            mostrarPopup('Username já existe! Escolha outro.');
            return;
        }

        var novoUtilizador = {
            login: user,
            pass: pass,
            nome: dadosPessoais.nome,
            apelido: dadosPessoais.apelido,
            idade: dadosPessoais.idade,
            ensino: dadosPessoais.ensino,
            avatar: dadosPessoais.avatar || null
        };

        utilizadores.push(novoUtilizador);
        localStorage.setItem('utilizadores', JSON.stringify(utilizadores));

        mostrarPopup('Conta criada com sucesso!');
        setTimeout(() => { window.location.href = 'login.html'; }, 1500);
    });
}

// ================= BOTÃO LOGIN =================
var btnLogar = document.getElementById('btnLogar');
if (btnLogar) {
    btnLogar.addEventListener('click', function () {
        var user = document.getElementById('user').value.trim();
        var pass = document.getElementById('pass').value.trim();

        if (!user && !pass) {
            mostrarPopup('Preencha username e password!');
            return;
        }
        if (!user) {
            mostrarPopup('Preencha o username!');
            return;
        }
        if (!pass) {
            mostrarPopup('Preencha a password!');
            return;
        }

        var utilizadoresLS = JSON.parse(localStorage.getItem('utilizadores')) || [];

        var encontrado = utilizadoresLS.some(u => u.login === user && u.pass === pass);

        if (encontrado) {
            mostrarPopup('Login com sucesso!');
            localStorage.setItem('userLogado', JSON.stringify({ username: user }));
            setTimeout(() => { window.location.href = 'bem-vind@.html'; }, 1500);
        } else {
            mostrarPopup('O username ou password estão incorretos.');
            document.getElementById('user').value = '';
            document.getElementById('pass').value = '';
        }
    });
}
