document.querySelectorAll('.bottom-bar a').forEach(link => {
    const linkURL = new URL(link.href, window.location.origin);
    if (linkURL.pathname === window.location.pathname) {
        link.classList.add('active');
    }
});

fetch('pausify/Paginas/navbar.html')
    .then(res => {
        if (!res.ok) throw new Error('Navbar não encontrada');
        return res.text();
    })
    .then(html => {
        document.getElementById('navbar').innerHTML = html;

        // Marcar o link ativo no menu após carregar a navbar
        document.querySelectorAll('.bottom-bar a').forEach(link => {
            const linkURL = new URL(link.href, window.location.origin);
            if (linkURL.pathname === window.location.pathname) {
                link.classList.add('active');
            }
        });
    })
    .catch(err => console.error(err));