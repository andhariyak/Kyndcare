// Menu: three-line button opens a full-screen menu on phones and tablets.
// Closes on link tap, Escape, or when the window grows to desktop width.
(function () {
    var toggle = document.querySelector('.menu-toggle');
    var menu = document.getElementById('site-menu');
    if (!toggle || !menu) return;

    function setOpen(open) {
        menu.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
        toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
        document.body.style.overflow = open ? 'hidden' : '';
    }

    toggle.addEventListener('click', function () { setOpen(menu.hidden); });

    menu.addEventListener('click', function (e) {
        if (e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !menu.hidden) { setOpen(false); toggle.focus(); }
    });

    var desktop = window.matchMedia('(min-width: 1024px)');
    function onChange(e) { if (e.matches) setOpen(false); }
    if (desktop.addEventListener) desktop.addEventListener('change', onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
})();
