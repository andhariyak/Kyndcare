// Three-line menu: open/close, close on outside click, link click or Escape
(function () {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('nav-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        setOpen(!menu.classList.contains('open'));
    });

    menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('click', function (e) {
        if (!menu.contains(e.target)) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') { setOpen(false); toggle.focus(); }
    });
})();
