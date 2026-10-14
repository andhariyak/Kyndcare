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

// Hero slideshow: crossfades through equipment photos; pauses on hover/focus and when the tab is hidden.
(function () {
    var root = document.querySelector('.hero-slider');
    if (!root) return;
    var slides = root.querySelectorAll('.slide');
    var dots = root.querySelectorAll('.slider-dots button');
    var i = 0, timer = null;
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function show(n) {
        i = (n + slides.length) % slides.length;
        slides.forEach(function (s, k) { s.classList.toggle('is-active', k === i); });
        dots.forEach(function (d, k) { if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current'); });
    }
    function start() { if (!reduce && !timer) timer = setInterval(function () { show(i + 1); }, 3500); }
    function stop() { clearInterval(timer); timer = null; }

    dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); stop(); start(); }); });
    root.addEventListener('mouseenter', stop);
    root.addEventListener('mouseleave', start);
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    start();
})();
