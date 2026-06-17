/* ============================================================
   SOFÍA GONZALEZ — PORTFOLIO · main.js
   ------------------------------------------------------------
   Módulos:
     1. Año del footer
     2. Menú móvil (toggle + cierre al navegar)
     3. Typewriter de cargos dinámicos
     4. Reveal on scroll (IntersectionObserver)
     5. Validación del formulario de contacto
   ============================================================ */

(() => {
  'use strict';

  /* ============================================================
     1 · AÑO DEL FOOTER — se actualiza solo
     ============================================================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ============================================================
     2 · MENÚ MÓVIL
     ============================================================ */
  const toggle = document.getElementById('navToggle');
  const menu   = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const open = menu.classList.toggle('is-open');
      toggle.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    });

    // Cierra el menú al hacer clic en cualquier enlace
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ============================================================
     3 · TYPEWRITER · cargos dinámicos
     ------------------------------------------------------------
     Para editar los cargos: modifica el array ROLES.
     ============================================================ */
  const ROLES = [
    'WordPress Developer',
    'Automation Builder · n8n',
    'AI Solutions con Python',
    'SEO Técnico',
    'Future Software Engineer'
  ];

  const roleEl = document.getElementById('roleType');

  if (roleEl && ROLES.length) {
    let i = 0;           // índice del rol actual
    let pos = 0;         // posición del carácter
    let deleting = false;

    const TYPE_DELAY   = 65;   // ms al escribir
    const DELETE_DELAY = 35;   // ms al borrar
    const HOLD_DELAY   = 1600; // ms manteniendo el texto completo

    const tick = () => {
      const word = ROLES[i];
      if (!deleting) {
        pos++;
        roleEl.textContent = word.slice(0, pos);
        if (pos === word.length) {
          deleting = true;
          return setTimeout(tick, HOLD_DELAY);
        }
        return setTimeout(tick, TYPE_DELAY);
      } else {
        pos--;
        roleEl.textContent = word.slice(0, pos);
        if (pos === 0) {
          deleting = false;
          i = (i + 1) % ROLES.length;
        }
        return setTimeout(tick, DELETE_DELAY);
      }
    };
    tick();
  }


  /* ============================================================
     4 · REVEAL ON SCROLL
     ------------------------------------------------------------
     Añade .is-visible a los .reveal cuando entran al viewport.
     ============================================================ */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    reveals.forEach(el => io.observe(el));
  } else {
    // Fallback para navegadores muy antiguos
    reveals.forEach(el => el.classList.add('is-visible'));
  }


  /* ============================================================
     5 · FORMULARIO DE CONTACTO
     ------------------------------------------------------------
     Estrategia: tras validar, abre el cliente de correo del visitante
     con el mensaje prellenado y dirigido a INBOX_EMAIL. Cero backend,
     funciona offline, 100% confiable en GitHub Pages.

     ¿Quieres que llegue solo, sin abrir el cliente de correo?
       → Crea cuenta gratis en https://formspree.io o https://web3forms.com
       → Cambia el <form> en index.html:
            <form id="contactForm" action="https://formspree.io/f/TU_ID" method="POST">
       → Borra el bloque mailto de abajo (no se necesita).
     ============================================================ */
  const INBOX_EMAIL = 'sofygonzalez1012@gmail.com';

  const form   = document.getElementById('contactForm');
  const status = document.getElementById('contactStatus');

  if (form && status) {
    const setError = (field, on) => {
      field.closest('.field')?.classList.toggle('is-error', on);
    };

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name    = form.elements['name'];
      const email   = form.elements['email'];
      const topic   = form.elements['topic'];
      const message = form.elements['message'];

      // Reset visual de errores
      [name, email, message].forEach(f => setError(f, false));

      // Validaciones simples
      let ok = true;
      if (!name.value.trim()) { setError(name, true); ok = false; }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (!emailOk) { setError(email, true); ok = false; }
      if (message.value.trim().length < 10) { setError(message, true); ok = false; }

      if (!ok) {
        status.textContent = '› Revisa los campos resaltados';
        status.className = 'contact__status is-error';
        return;
      }

      // Asunto y cuerpo del correo
      const topicLabel = topic.options[topic.selectedIndex].text;
      const subject = `[Portafolio] ${topicLabel} · ${name.value.trim()}`;
      const body =
        `Hola Sofía,\n\n` +
        `${message.value.trim()}\n\n` +
        `— — — — — — — — — — —\n` +
        `Nombre: ${name.value.trim()}\n` +
        `Correo: ${email.value.trim()}\n` +
        `Tema:   ${topicLabel}\n` +
        `Enviado desde tu portafolio web.`;

      const mailto = `mailto:${INBOX_EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      // Abre el cliente de correo del visitante con el mensaje listo
      window.location.href = mailto;

      status.textContent = '› Abriendo tu cliente de correo · solo presiona enviar';
      status.className = 'contact__status is-ok';
    });
  }

})();
