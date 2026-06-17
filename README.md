# Sofía Gonzalez — Portafolio personal

Portafolio profesional construido con **HTML + CSS + JavaScript puro**.
Pensado para publicarse en **GitHub Pages**, funcionar offline y escalar
con nuevos proyectos sin tocar la arquitectura.

> Diseño anclado en el manual de marca *Aura Automations*:
> paleta Lino · Rosa Arcilla · Tinta · Lavanda · Moca, con
> tipografías **Cormorant Garamond**, **Hanken Grotesk** y **JetBrains Mono**.

---

## 📁 Estructura

```
site/
├── index.html              ← contenido y secciones
├── css/styles.css          ← sistema de marca, layout y animaciones
├── js/main.js              ← typewriter, reveal, menú móvil, validación
├── assets/
│   ├── img/profile.png     ← foto profesional (reemplazable)
│   └── icons/              ← reservado para iconografía extra
├── robots.txt
├── .nojekyll               ← evita el procesamiento Jekyll en GitHub Pages
└── README.md
```

---

## 🚀 Publicación en GitHub Pages

1. Crea un repo nuevo en tu cuenta de GitHub (por ejemplo `portafolio`).
2. Sube el contenido de la carpeta `site/` a la raíz del repo.
3. Ve a **Settings → Pages**.
4. En **Source**, selecciona la rama `main` y la carpeta `/ (root)`.
5. Guarda. En unos minutos tendrás tu sitio en
   `https://<tu-usuario>.github.io/<tu-repo>/`.

> Si quieres que viva en `https://<tu-usuario>.github.io/` (sin subruta),
> nombra el repo exactamente `<tu-usuario>.github.io`.

---

## ✏️ Personalización rápida

| Qué cambiar           | Dónde                              |
|-----------------------|------------------------------------|
| Tu nombre y cargo     | `index.html` → sección `.hero`     |
| Cargos rotativos      | `js/main.js` → array `ROLES`       |
| Servicios             | `index.html` → sección `#services` |
| Stack                 | `index.html` → sección `#stack`    |
| Proyectos             | `index.html` → sección `#projects` |
| Próximos proyectos    | `index.html` → sección `.upcoming` |
| Trayectoria           | `index.html` → sección `#journey`  |
| Contactos / redes     | `index.html` → sección `#contact`  |
| Foto profesional      | `assets/img/profile.png`           |
| Colores y tipografías | `css/styles.css` → bloque `1 · TOKENS` |

### Agregar un proyecto nuevo

Duplica un `<article class="project">` dentro de `<div class="projects">`
y reemplaza imagen, título, descripción, lista de tecnologías y enlaces a
demo y GitHub. Cada proyecto incluye un `<details>` desplegable con
funciones, objetivos, retos y resultados.

### Conectar el formulario de contacto

El JS valida los campos en el cliente. Para enviar mensajes reales sin
backend, conéctalo a un servicio como **Formspree**, **Getform** o
**Web3Forms**:

```html
<form id="contactForm" action="https://formspree.io/f/XXXX" method="POST" novalidate>
```

---

## 🎨 Sistema de marca

```css
--lino:    #F4EFE8;  /* base */
--rosa:    #DEB6AE;  /* acento */
--tinta:   #211D1B;  /* texto / estructura */
--lavanda: #B2A6D4;  /* IA / automatización */
--moca:    #998574;  /* neutral de apoyo */
```

Tipografías cargadas desde Google Fonts (con fallback a sistema si no hay
conexión). Si necesitas 100 % offline, descarga los WOFF2 de las tres
familias y agrégalas como `@font-face` en `styles.css`.

---

## ♿ Accesibilidad y rendimiento

- HTML semántico (`header`, `nav`, `main`, `section`, `article`, `footer`).
- Etiquetas `aria-*` en menú, formulario y elementos decorativos.
- Imagen del hero con `alt` descriptivo, decoración con `aria-hidden`.
- `prefers-reduced-motion` desactiva animaciones para usuarios sensibles.
- Sin frameworks pesados: HTML + CSS + un único `main.js` con `defer`.
- `meta description`, Open Graph y favicon SVG inline para que cargue sin red.

---

## 📜 Licencia

Personal · 2026 · Sofía Gonzalez García
