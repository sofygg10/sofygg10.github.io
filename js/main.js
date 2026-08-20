/* ============================================================
   SOFÍA GONZALEZ — PORTFOLIO · main.js
   ------------------------------------------------------------
   Módulos:
     1. Año del footer
     2. Menú móvil (toggle + cierre al navegar)
     3. Typewriter de cargos dinámicos
     4. Reveal on scroll (IntersectionObserver)
     5. Validación del formulario de contacto
     6. i18n — cambio de idioma ES / EN
   ============================================================ */

(() => {
  'use strict';

  /* ============================================================
     0 · DICCIONARIO i18n
     ------------------------------------------------------------
     Para añadir / editar una traducción: localiza la clave y modifica
     el valor en ES y EN. Las claves coinciden con los atributos
     data-i18n / data-i18n-html / data-i18n-placeholder / etc. del HTML.
     ============================================================ */
  const I18N = {
    es: {
      // META
      'meta.title': 'Sofía Gonzalez · WordPress Developer · n8n · IA · SEO Técnico',
      'meta.description': 'Portafolio profesional de Sofía Gonzalez García — Desarrolladora Web WordPress, automatización de procesos con n8n y Python, e implementación de IA y SEO técnico.',
      'meta.og.title': 'Sofía Gonzalez — WordPress · Automatización · IA',
      'meta.og.description': 'Soluciones digitales con automatización, IA y experiencia de usuario.',

      // NAV
      'nav.about': 'Sobre mí',
      'nav.services': 'Servicios',
      'nav.stack': 'Stack',
      'nav.projects': 'Proyectos',
      'nav.journey': 'Trayectoria',
      'nav.contact': 'Contacto',
      'nav.aria.home': 'Inicio · Sofía Gonzalez',
      'nav.aria.menu': 'Navegación principal',
      'nav.aria.openMenu': 'Abrir menú',
      'nav.aria.closeMenu': 'Cerrar menú',
      'nav.aria.lang': 'Cambiar idioma',

      // HERO
      'hero.eyebrow': 'Portafolio · 2026',
      'hero.hello': 'Hola, soy',
      'hero.pitch': 'Diseño soluciones digitales que combinan <em>automatización con n8n</em>, <em>inteligencia artificial</em> y <em>WordPress profesional</em> para acelerar negocios.',
      'hero.cta.projects': 'Ver proyectos',
      'hero.cta.contact': 'Contactarme',
      'hero.kpi.indicators': 'Indicadores',
      'hero.kpi.base.k': 'Base',
      'hero.kpi.base.v': 'Manizales · CO',
      'hero.kpi.stack.k': 'Stack',
      'hero.kpi.stack.v': 'WP · n8n · Py',
      'hero.kpi.status.k': 'Status',
      'hero.kpi.status.v': 'abierta a oportunidades',
      'hero.photo.alt': 'Retrato profesional de Sofía Gonzalez',
      'marquee.seo': 'SEO Técnico',

      // ABOUT
      'about.num': '01 / Sobre mí',
      'about.title': 'De la analítica a la automatización inteligente.',
      'about.lead': 'Soy <strong>Tecnóloga en Análisis y Desarrollo de Sistemas</strong> y estudiante de <strong>Ingeniería en Sistemas y Telecomunicaciones</strong> (octavo semestre, Universidad de Manizales). Construyo sitios WordPress, automatizo procesos con n8n y aplico IA para que los equipos puedan enfocarse en lo que realmente importa.',
      'about.history.chip': 'Historia',
      'about.history.body': 'Empecé optimizando contenido y posicionamiento SEO en <strong>Creative Studios SAS</strong>. Esa raíz analítica me llevó al frontend y a WordPress; en <strong>OrbidI</strong> implementé sitios con Crocoblock, administré hosting con cPanel, ejecuté migraciones críticas y diseñé automatizaciones con <strong>n8n</strong> que integran IA y APIs.',
      'about.experience.chip': 'Experiencia',
      'about.experience.1': 'WordPress + Crocoblock en producción',
      'about.experience.2': 'cPanel, migraciones y configuración de DNS',
      'about.experience.3': 'Automatización de procesos con n8n',
      'about.experience.4': 'Integración de APIs e IA generativa',
      'about.experience.5': 'SEO técnico: Screaming Frog, Ahrefs, Semrush',
      'about.experience.6': 'Programación en Python y JavaScript',
      'about.experience.7': 'Inglés nivel B1 (intermedio)',
      'about.goals.chip': 'Objetivos',
      'about.goals.1': 'Crecer como desarrolladora de soluciones digitales',
      'about.goals.2': 'Liderar implementaciones de IA en negocios reales',
      'about.goals.3': 'Profundizar en Data &amp; Software Engineering',
      'about.goals.4': 'Construir productos SaaS con automatización',

      'traits.1': 'aprendizaje constante',
      'traits.2': 'resolución de problemas',
      'traits.3': 'comunicación efectiva',
      'traits.4': 'pensamiento analítico',
      'traits.5': 'creatividad',
      'traits.6': 'trabajo en equipo',
      'traits.7': 'innovación tecnológica',

      // SERVICES
      'services.num': '02 / Servicios',
      'services.title': 'Qué construyo para tu negocio.',
      'services.lead': 'Tarjetas accionables, no abstracciones. Cada servicio entrega resultados medibles.',
      'services.1.title': 'WordPress + Crocoblock',
      'services.1.desc': 'Sitios interactivos con tipos de contenido personalizados, lógica dinámica y arquitectura escalable lista para producción.',
      'services.2.title': 'Automatización con n8n',
      'services.2.desc': 'Flujos low-code que clasifican correos, interceptan excepciones del CMS y orquestan procesos de negocio sin fricción.',
      'services.3.title': 'IA aplicada con Python',
      'services.3.desc': 'Integración de modelos generativos a procesos reales: contenido, clasificación, asistentes y análisis con Python.',
      'services.4.title': 'SEO Técnico &amp; Auditorías',
      'services.4.desc': 'Auditorías de rendimiento e indexabilidad con Screaming Frog, Ahrefs y Semrush. Schema, Core Web Vitals y arquitectura clara.',
      'services.5.title': 'Hosting, cPanel &amp; DNS',
      'services.5.desc': 'Gestión integral del entorno: cPanel, zonas DNS (A, CNAME, TXT) y migraciones críticas con cero pérdida de datos.',
      'services.6.title': 'Optimización Web',
      'services.6.desc': 'Velocidad, estructura semántica, accesibilidad y conversión. Cada milisegundo trabajando a favor del negocio.',
      'services.7.title': 'Integración de APIs',
      'services.7.desc': 'Conecto WordPress, n8n, CRMs y modelos de IA con APIs REST claras, seguras y bien documentadas.',
      'services.8.title': 'Dashboards &amp; Análisis de datos',
      'services.8.desc': 'Indicadores claros y reportes automatizados con Python y Google Analytics que cuentan la historia detrás de los números.',

      // STACK
      'stack.num': '03 / Stack',
      'stack.title': 'Herramientas que uso a diario.',
      'stack.cat.frontend': 'Frontend',
      'stack.cat.cms': 'CMS',
      'stack.cat.automation': 'Automatización',
      'stack.cat.aidata': 'IA &amp; Data',
      'stack.cat.seo': 'SEO &amp; Analítica',
      'stack.cat.infra': 'Infraestructura',
      'stack.cat.vcs': 'Control de versiones',
      'stack.cat.design': 'Diseño',
      'stack.react': 'React (fund.)',
      'stack.promptEng': 'Prompt Engineering',
      'stack.aiAgents': 'Agentes de IA',
      'stack.llmApps': 'Aplicaciones LLM',
      'stack.dataAnalysis': 'Análisis de datos',
      'stack.jsonProc': 'Procesamiento JSON',

      // PROJECTS
      'projects.num': '04 / Proyectos',
      'projects.title': 'Casos donde la automatización <em>se nota</em>.',
      'projects.lead': 'Una selección curada de proyectos donde el código, la IA y el diseño trabajan juntos.',
      'projects.viewDetails': 'Ver detalles',
      'projects.functions': 'Funciones',
      'projects.objective': 'Objetivo',
      'projects.challenges': 'Retos',
      'projects.results': 'Resultados',
      'projects.decisions': 'Decisiones técnicas',
      'projects.demo': 'Demo',
      'projects.docs': 'Docs',
      'projects.aria.github': 'Ver código en GitHub',
      'projects.comingSoon': 'En desarrollo — próximamente',

      'projects.p1.desc': 'Sistema inteligente construido con <strong>n8n</strong> e <strong>IA</strong> para gestionar grandes volúmenes de correos: clasifica, prioriza, resume y crea tareas automáticamente.',
      'projects.p1.fn.1': 'Lectura automática de correos',
      'projects.p1.fn.2': 'Clasificación inteligente',
      'projects.p1.fn.3': 'Detección de prioridad',
      'projects.p1.fn.4': 'Resúmenes automáticos',
      'projects.p1.fn.5': 'Creación de tareas',
      'projects.p1.fn.6': 'Integración con calendarios',
      'projects.p1.fn.7': 'Reportes automáticos',
      'projects.p1.objective': 'Liberar horas de bandeja de entrada y convertir cada correo en una acción concreta.',
      'projects.p1.challenges': 'Diseñar prompts confiables, manejar contexto largo y orquestar múltiples servicios sin perder trazabilidad.',
      'projects.p1.results': 'Reducción significativa del tiempo dedicado a triage de correo y mayor consistencia en las respuestas.',
      'projects.p1.aria.demo': 'Ver demo de AI Mail Assistant',

      'projects.p2.desc': 'Plataforma <strong>SaaS</strong> potenciada con IA que automatiza la creación inicial de sitios <strong>WordPress</strong>: sitemap, wireframes, SEO y contenido en minutos.',
      'projects.p2.fn.1': 'Generación de sitemap',
      'projects.p2.fn.2': 'Wireframes automáticos',
      'projects.p2.fn.3': 'SEO automático',
      'projects.p2.fn.4': 'Generación de contenido',
      'projects.p2.fn.5': 'Conexión con WordPress vía REST API',
      'projects.p2.fn.6': 'Orquestación mediante n8n',
      'projects.p2.objective': 'Acortar de semanas a horas el arranque de un sitio WordPress profesional.',
      'projects.p2.challenges': 'Mantener una identidad coherente, conectar IA generativa con la REST API y dejar el sitio editable sin fricción.',
      'projects.p2.results': 'Flujo end-to-end que entrega un sitio inicial listo para refinar, con SEO base y contenido coherente.',
      'projects.p2.aria.demo': 'Ver demo de Aura Site Builder AI',

      'projects.p3.desc': 'API REST en <strong>Node.js / Express</strong> que convierte la foto real de una mascota en un avatar ilustrado tipo <em>Pixar / Dreamworks</em>. Combina <strong>Google Cloud Vision</strong> para detectar especie, raza, color y etapa de vida, un catálogo local con <strong>matching difuso (Levenshtein)</strong> y un fallback de generación con <strong>FLUX vía Pollinations.ai</strong>.',
      'projects.p3.pipeline': 'Pipeline de 5 etapas',
      'projects.p3.fn.1': '<strong>Reconocimiento</strong> · Google Vision (LABEL_DETECTION) etiqueta la foto',
      'projects.p3.fn.2': '<strong>Normalización</strong> · diccionarios convierten labels a <code>{species, breed, color, stage}</code> con sinónimos y blocklist de contexto',
      'projects.p3.fn.3': '<strong>Match en catálogo</strong> · Levenshtein sobre <code>assets/avatars/</code>; si confianza &gt; 0.80 responde sin llamar a IA',
      'projects.p3.fn.4': '<strong>Fallback con IA</strong> · genera con FLUX vía Pollinations.ai usando un prompt dinámico estilo Pixar/Dreamworks',
      'projects.p3.fn.5': '<strong>Caché auto-poblante</strong> · doble escritura (historial + catálogo): el sistema se vuelve más rápido y barato con el uso',
      'projects.p3.objective': 'Entregar avatares estilizados y consistentes que reflejen los rasgos reales de cada mascota en segundos, sin pagar un ilustrador ni intervención manual.',
      'projects.p3.decisions': 'Resolución de raza por capas (exacta → substring → keywords → fallback a "criollo"), lógica dedicada para gatos naranjas (branding del producto), logs trazables por etapa (<code>[Vision]</code>, <code>[Match]</code>, <code>[Cache]</code>) y diseño para Oracle Cloud con load balancer y health check.',
      'projects.p3.results': 'Endpoint <code>POST /api/avatar/match</code> devuelve <code>source</code>, <code>imageUrl</code>, <code>matchedAttributes</code> y <code>confidence</code>. Cada generación enriquece el catálogo, reduciendo costos y tiempos de respuesta futuros.',
      'projects.p3.alt.catalog': 'Catálogo auto-poblante en assets/avatars con avatares ya generados de perros y gatos',
      'projects.p3.alt.postman': 'Respuesta del endpoint en Postman: source, imageUrl, matchedAttributes y confidence',
      'projects.p3.caption.1': 'Catálogo · doble escritura en <code>assets/avatars/</code>',
      'projects.p3.caption.2': 'Prueba real · respuesta del endpoint <code>/api/avatar/match</code>',
      'projects.p3.aria.github': 'Ver código de Furl Life en GitHub',
      'projects.p3.aria.docs': 'Ver documentación de Furl Life',

      'projects.p4.title': 'FurLife — Asistente IA "Luna" en n8n',
      'projects.p4.desc': 'Workflow en <strong>n8n</strong> que expone un asistente conversacional con <strong>Google Gemini</strong> y un sistema proactivo de recordatorios diarios para citas veterinarias del día siguiente.',
      'projects.p4.fn.1': 'Chat reactivo vía webhook con memoria por <code>session_id</code>',
      'projects.p4.fn.2': 'Tool calling: Google Calendar + búsqueda web (Serper)',
      'projects.p4.fn.3': '<em>Action codes</em> que indican al frontend qué pantalla abrir',
      'projects.p4.fn.4': 'Recordatorio diario a las 8 AM por Gmail',
      'projects.p4.fn.5': 'Redacción cariñosa con emojis 🐾 generada por un segundo agente',
      'projects.p4.fn.6': 'Infra local con Docker Compose',
      'projects.p4.objective': 'Dar al vertical de mascotas un asistente conversacional barato y rápido que además avise proactivamente al dueño cuando su mascota tiene cita al día siguiente.',
      'projects.p4.challenges': 'Desacoplar IA y frontend mediante <em>action codes</em> estables, mantener memoria por usuario y orquestar dos flujos (reactivo + proactivo) en el mismo canvas sin acoplarlos.',
      'projects.p4.decisions': 'Gemini Flash por latencia y costo, memoria por <code>session_id</code> y separación del JSON del texto en un nodo de código para que la app reaccione a códigos estables aunque el modelo varíe su redacción.',
      'projects.p4.caption.1': 'Flujo 1 · Chat de Luna con tool calling',
      'projects.p4.caption.2': 'Prueba real · respuesta con <code>action_code</code>',
      'projects.p4.alt.overview': 'Vista general del workflow de n8n con los flujos Chat de Luna y Recordatorio diario',
      'projects.p4.alt.flow': 'Detalle del Flujo 1: Webhook → AI Agent (Gemini) con memoria, búsqueda y calendar_manager → Code JS → Respond to Webhook',
      'projects.p4.alt.postman': 'Prueba del webhook en Postman mostrando la respuesta con status, response y action_code',
      'projects.p4.aria.github': 'Ver código de FurLife Luna en GitHub',
      'projects.p4.aria.docs': 'Ver documentación de FurLife Luna',

      'projects.p5.desc': 'App de <strong>transporte público</strong> para Manizales: permite consultar las <strong>rutas de buses</strong> de la ciudad de forma clara y rápida. Disponible en <strong>App Store</strong>, <strong>Google Play</strong> y web.',
      'projects.p5.roleTitle': 'Mi aporte',
      'projects.p5.role.1': 'Investigación del sistema de transporte de la ciudad',
      'projects.p5.role.2': 'Recolección y estructuración de datos de rutas',
      'projects.p5.role.3': 'Desarrollo frontend de la interfaz',
      'projects.p5.objective': 'Facilitar la movilidad en Manizales dando a las personas una forma sencilla de encontrar la ruta de bus que necesitan.',
      'projects.p5.platformsTitle': 'Plataformas',
      'projects.p5.platforms': 'Aplicación multiplataforma publicada en App Store y Google Play, con sitio web informativo.',
      'projects.p5.tech.research': 'Investigación',
      'projects.p5.tech.data': 'Datos de rutas',
      'projects.p5.alt.logo': 'Logo de Punto Ruta Manizales: la Catedral de Manizales en dorado sobre fondo vino tinto',
      'projects.p5.site': 'Sitio web',
      'projects.p5.appstore': 'App Store',
      'projects.p5.aria.site': 'Visitar el sitio web de Punto Ruta Manizales',
      'projects.p5.aria.appstore': 'Descargar Punto Ruta en el App Store',

      // UPCOMING
      'upcoming.num': '04.b / En construcción',
      'upcoming.title': 'Próximos proyectos',
      'upcoming.lead': 'Reservando espacio para lo que viene.',
      'upcoming.1.tag': 'Automatización',
      'upcoming.1.title': 'Workflow empresarial',
      'upcoming.1.desc': 'Pipelines internos para escalar operaciones con IA y orquestación n8n.',
      'upcoming.2.tag': 'Dashboard',
      'upcoming.2.title': 'Analítica accionable',
      'upcoming.2.desc': 'Visualización en tiempo real para equipos de marketing y producto.',
      'upcoming.3.tag': 'IA aplicada',
      'upcoming.3.title': 'Asistente vertical',
      'upcoming.3.desc': 'Agente especializado por industria, con memoria y herramientas propias.',
      'upcoming.4.tag': 'SaaS',
      'upcoming.4.title': 'Producto en validación',
      'upcoming.4.desc': 'Una idea que mezcla automatización y contenido para creadores.',
      'upcoming.5.tag': 'Empresa',
      'upcoming.5.title': 'Proyecto cliente',
      'upcoming.5.desc': 'Implementación a medida en proceso. Pronto será publicada aquí.',

      // JOURNEY
      'journey.num': '05 / Trayectoria',
      'journey.title': 'Una ruta que evoluciona con la tecnología.',
      'journey.1.phase': '2020 · Inicio',
      'journey.1.title': 'Técnico Profesional en Programación',
      'journey.1.body': 'Universidad Autónoma de Manizales. Bases sólidas de programación, lógica y sistemas.',
      'journey.2.phase': '2022 · Tecnología',
      'journey.2.title': 'Tecnóloga en Análisis y Desarrollo de Sistemas',
      'journey.2.body': 'Universidad Autónoma de Manizales. Análisis, programación y desarrollo de sistemas de información.',
      'journey.3.phase': '2022 – 2024 · Creative Studios SAS',
      'journey.3.title': 'Analista SEO &amp; Desarrolladora Frontend',
      'journey.3.body': 'Ingresé en enero de 2022 con una práctica profesional de 6 meses y me contrataron desde septiembre de 2022 hasta septiembre de 2024. Auditorías técnicas con Screaming Frog, Ahrefs y Semrush. Optimización de velocidad y estructura. Frontend con HTML, CSS y JavaScript. Administración de WordPress y Wix.',
      'journey.4.phase': 'Bootcamp · IA',
      'journey.4.title': 'Inteligencia Artificial',
      'journey.4.body': 'Fundamentos de IA, desarrollo de modelos básicos y análisis de datos con Python.',
      'journey.5.phase': '2025 – 2026 · OrbidI',
      'journey.5.title': 'Web Implementer / WordPress Developer',
      'journey.5.body': 'WordPress + Crocoblock en producción. Administración de hosting con cPanel, migraciones críticas (cero pérdida de datos), zonas DNS y registros A/CNAME/TXT. Flujos n8n para interceptar excepciones del CMS y clasificar correos automáticamente.',
      'journey.6.phase': 'En curso · Universidad de Manizales',
      'journey.6.title': 'Ingeniería en Sistemas y Telecomunicaciones',
      'journey.6.body': 'Octavo semestre. Profundizando en arquitectura de software, redes, datos e ingeniería para construir productos digitales sólidos y escalables.',

      // CERTIFICACIONES
      'certs.num': '05.b / Certificaciones',
      'certs.title': 'Formación certificada y verificable.',
      'certs.lead': 'Credenciales oficiales que respaldan mi aprendizaje con evidencia comprobable.',
      'certs.view': 'Ver certificado',
      'certs.verify': 'Verificar',
      'certs.ia.badge': 'Verificable · auco.ai',
      'certs.ia.title': 'Inteligencia Artificial · Nivel Básico',
      'certs.ia.issuer': '<strong>MinTIC</strong> · Unión Temporal <strong>IU Training</strong> — Universidad de Antioquia, Universidad de Caldas y Ubicua Technology.',
      'certs.ia.meta.hours': '159 horas',
      'certs.ia.meta.date': 'Marzo 2026',
      'certs.ia.meta.type': 'Bootcamp',
      'certs.ia.aria.view': 'Ver certificado de Inteligencia Artificial en PDF',
      'certs.ia.aria.verify': 'Verificar autenticidad del certificado en auco.ai',

      // CONTACT
      'contact.num': '06 / Contacto',
      'contact.title': 'Hablemos de tu próximo proyecto.',
      'contact.lead': '¿Una idea? ¿Una integración? ¿Una colaboración? Escríbeme y te respondo personalmente.',
      'contact.channels': 'Canales directos',
      'contact.signature': 'Disponible para nuevos proyectos en 2026.',

      'form.name': 'Nombre',
      'form.email': 'Correo',
      'form.topic': 'Tema',
      'form.message': 'Mensaje',
      'form.namePh': 'Tu nombre completo',
      'form.emailPh': 'tunombre@email.com',
      'form.messagePh': 'Cuéntame brevemente en qué puedo ayudarte',
      'form.topic.project': 'Proyecto / cotización',
      'form.topic.consultancy': 'Consultoría',
      'form.topic.collab': 'Colaboración',
      'form.topic.opportunity': 'Oportunidad laboral',
      'form.topic.other': 'Otro',
      'form.submit': 'Enviar mensaje',
      'form.errors.fields': '› Revisa los campos resaltados',
      'form.success': '› Abriendo tu cliente de correo · solo presiona enviar',
      'form.subjectPrefix': 'Portafolio',
      'form.body.greeting': 'Hola Sofía,',
      'form.body.nameLabel': 'Nombre',
      'form.body.emailLabel': 'Correo',
      'form.body.topicLabel': 'Tema',
      'form.body.from': 'Enviado desde tu portafolio web.',

      'channel.email': 'Correo',
      'channel.location': 'Ubicación',
      'channel.location.value': 'Manizales, Colombia · disponible remoto',
      'channel.aria.email': 'Escribir por correo',
      'channel.aria.linkedin': 'Visitar LinkedIn',
      'channel.aria.github': 'Visitar GitHub',
      'channel.aria.whatsapp': 'Escribir por WhatsApp',
      'channel.aria.location': 'Ubicación',

      // FOOTER
      'footer.quote': 'Construyendo soluciones inteligentes para el futuro.',
      'footer.tech': 'Hecho con HTML, CSS y JavaScript'
    },

    en: {
      // META
      'meta.title': 'Sofía Gonzalez · WordPress Developer · n8n · AI · Technical SEO',
      'meta.description': 'Professional portfolio of Sofía Gonzalez García — WordPress developer, process automation with n8n and Python, AI implementation and technical SEO.',
      'meta.og.title': 'Sofía Gonzalez — WordPress · Automation · AI',
      'meta.og.description': 'Digital solutions blending automation, AI and user experience.',

      // NAV
      'nav.about': 'About',
      'nav.services': 'Services',
      'nav.stack': 'Stack',
      'nav.projects': 'Projects',
      'nav.journey': 'Journey',
      'nav.contact': 'Contact',
      'nav.aria.home': 'Home · Sofía Gonzalez',
      'nav.aria.menu': 'Main navigation',
      'nav.aria.openMenu': 'Open menu',
      'nav.aria.closeMenu': 'Close menu',
      'nav.aria.lang': 'Switch language',

      // HERO
      'hero.eyebrow': 'Portfolio · 2026',
      'hero.hello': 'Hi, I\'m',
      'hero.pitch': 'I build digital solutions that combine <em>n8n automation</em>, <em>artificial intelligence</em> and <em>professional WordPress</em> to accelerate businesses.',
      'hero.cta.projects': 'See projects',
      'hero.cta.contact': 'Get in touch',
      'hero.kpi.indicators': 'Indicators',
      'hero.kpi.base.k': 'Based in',
      'hero.kpi.base.v': 'Manizales · CO',
      'hero.kpi.stack.k': 'Stack',
      'hero.kpi.stack.v': 'WP · n8n · Py',
      'hero.kpi.status.k': 'Status',
      'hero.kpi.status.v': 'open to opportunities',
      'hero.photo.alt': 'Professional portrait of Sofía Gonzalez',
      'marquee.seo': 'Technical SEO',

      // ABOUT
      'about.num': '01 / About',
      'about.title': 'From analytics to intelligent automation.',
      'about.lead': 'I\'m a <strong>Systems Analysis and Development Technologist</strong> and an eighth-semester student of <strong>Systems and Telecommunications Engineering</strong> at Universidad de Manizales. I build WordPress sites, automate processes with n8n and apply AI so teams can focus on what really matters.',
      'about.history.chip': 'Background',
      'about.history.body': 'I started optimizing content and SEO at <strong>Creative Studios SAS</strong>. That analytical root led me into frontend and WordPress; at <strong>OrbidI</strong> I shipped sites with Crocoblock, managed hosting with cPanel, ran critical migrations and designed <strong>n8n</strong> automations integrating AI and APIs.',
      'about.experience.chip': 'Experience',
      'about.experience.1': 'WordPress + Crocoblock in production',
      'about.experience.2': 'cPanel, migrations and DNS setup',
      'about.experience.3': 'Process automation with n8n',
      'about.experience.4': 'API and generative AI integration',
      'about.experience.5': 'Technical SEO: Screaming Frog, Ahrefs, Semrush',
      'about.experience.6': 'Python and JavaScript programming',
      'about.experience.7': 'English level B1 (intermediate)',
      'about.goals.chip': 'Goals',
      'about.goals.1': 'Grow as a digital-solutions developer',
      'about.goals.2': 'Lead AI implementations in real businesses',
      'about.goals.3': 'Deepen in Data &amp; Software Engineering',
      'about.goals.4': 'Build SaaS products powered by automation',

      'traits.1': 'continuous learning',
      'traits.2': 'problem solving',
      'traits.3': 'effective communication',
      'traits.4': 'analytical thinking',
      'traits.5': 'creativity',
      'traits.6': 'teamwork',
      'traits.7': 'tech innovation',

      // SERVICES
      'services.num': '02 / Services',
      'services.title': 'What I build for your business.',
      'services.lead': 'Actionable cards, no abstractions. Every service delivers measurable results.',
      'services.1.title': 'WordPress + Crocoblock',
      'services.1.desc': 'Interactive sites with custom post types, dynamic logic and a scalable, production-ready architecture.',
      'services.2.title': 'Automation with n8n',
      'services.2.desc': 'Low-code flows that classify emails, intercept CMS exceptions and orchestrate business processes without friction.',
      'services.3.title': 'Applied AI with Python',
      'services.3.desc': 'Integrating generative models into real processes: content, classification, assistants and analysis with Python.',
      'services.4.title': 'Technical SEO &amp; Audits',
      'services.4.desc': 'Performance and indexability audits with Screaming Frog, Ahrefs and Semrush. Schema, Core Web Vitals and a clean architecture.',
      'services.5.title': 'Hosting, cPanel &amp; DNS',
      'services.5.desc': 'End-to-end environment management: cPanel, DNS zones (A, CNAME, TXT) and critical migrations with zero data loss.',
      'services.6.title': 'Web Optimization',
      'services.6.desc': 'Speed, semantic structure, accessibility and conversion. Every millisecond working for the business.',
      'services.7.title': 'API Integration',
      'services.7.desc': 'I connect WordPress, n8n, CRMs and AI models through clear, secure, well-documented REST APIs.',
      'services.8.title': 'Dashboards &amp; Data Analysis',
      'services.8.desc': 'Clear indicators and automated reports with Python and Google Analytics that tell the story behind the numbers.',

      // STACK
      'stack.num': '03 / Stack',
      'stack.title': 'Tools I use every day.',
      'stack.cat.frontend': 'Frontend',
      'stack.cat.cms': 'CMS',
      'stack.cat.automation': 'Automation',
      'stack.cat.aidata': 'AI &amp; Data',
      'stack.cat.seo': 'SEO &amp; Analytics',
      'stack.cat.infra': 'Infrastructure',
      'stack.cat.vcs': 'Version control',
      'stack.cat.design': 'Design',
      'stack.react': 'React (basics)',
      'stack.promptEng': 'Prompt Engineering',
      'stack.aiAgents': 'AI Agents',
      'stack.llmApps': 'LLM Applications',
      'stack.dataAnalysis': 'Data Analysis',
      'stack.jsonProc': 'JSON Processing',

      // PROJECTS
      'projects.num': '04 / Projects',
      'projects.title': 'Cases where automation <em>is felt</em>.',
      'projects.lead': 'A curated selection of projects where code, AI and design work together.',
      'projects.viewDetails': 'See details',
      'projects.functions': 'Features',
      'projects.objective': 'Objective',
      'projects.challenges': 'Challenges',
      'projects.results': 'Results',
      'projects.decisions': 'Technical decisions',
      'projects.demo': 'Demo',
      'projects.docs': 'Docs',
      'projects.aria.github': 'View code on GitHub',
      'projects.comingSoon': 'In development — coming soon',

      'projects.p1.desc': 'Smart system built with <strong>n8n</strong> and <strong>AI</strong> to manage large email volumes: it classifies, prioritizes, summarizes and creates tasks automatically.',
      'projects.p1.fn.1': 'Automatic email reading',
      'projects.p1.fn.2': 'Smart classification',
      'projects.p1.fn.3': 'Priority detection',
      'projects.p1.fn.4': 'Automatic summaries',
      'projects.p1.fn.5': 'Task creation',
      'projects.p1.fn.6': 'Calendar integration',
      'projects.p1.fn.7': 'Automated reports',
      'projects.p1.objective': 'Free up inbox hours and turn every email into a concrete action.',
      'projects.p1.challenges': 'Design reliable prompts, handle long context and orchestrate multiple services without losing traceability.',
      'projects.p1.results': 'Significant reduction in email triage time and greater consistency in replies.',
      'projects.p1.aria.demo': 'View AI Mail Assistant demo',

      'projects.p2.desc': 'AI-powered <strong>SaaS</strong> platform that automates the initial setup of <strong>WordPress</strong> sites: sitemap, wireframes, SEO and content in minutes.',
      'projects.p2.fn.1': 'Sitemap generation',
      'projects.p2.fn.2': 'Automatic wireframes',
      'projects.p2.fn.3': 'Automatic SEO',
      'projects.p2.fn.4': 'Content generation',
      'projects.p2.fn.5': 'WordPress connection via REST API',
      'projects.p2.fn.6': 'Orchestration through n8n',
      'projects.p2.objective': 'Cut WordPress site startup from weeks to hours.',
      'projects.p2.challenges': 'Maintain a coherent identity, connect generative AI to the REST API and leave the site editable without friction.',
      'projects.p2.results': 'End-to-end flow delivering an initial site ready to refine, with baseline SEO and coherent content.',
      'projects.p2.aria.demo': 'View Aura Site Builder AI demo',

      'projects.p3.desc': 'REST API in <strong>Node.js / Express</strong> that turns a pet\'s photo into an illustrated <em>Pixar / Dreamworks</em>-style avatar. Combines <strong>Google Cloud Vision</strong> to detect species, breed, color and life stage, a local catalog with <strong>fuzzy matching (Levenshtein)</strong>, and an AI fallback using <strong>FLUX via Pollinations.ai</strong>.',
      'projects.p3.pipeline': '5-stage pipeline',
      'projects.p3.fn.1': '<strong>Recognition</strong> · Google Vision (LABEL_DETECTION) tags the photo',
      'projects.p3.fn.2': '<strong>Normalization</strong> · dictionaries map labels into <code>{species, breed, color, stage}</code> with synonyms and a context blocklist',
      'projects.p3.fn.3': '<strong>Catalog match</strong> · Levenshtein over <code>assets/avatars/</code>; if confidence &gt; 0.80, returns without calling AI',
      'projects.p3.fn.4': '<strong>AI fallback</strong> · generates with FLUX via Pollinations.ai using a dynamic Pixar/Dreamworks-style prompt',
      'projects.p3.fn.5': '<strong>Self-populating cache</strong> · double write (history + catalog): the system gets faster and cheaper with use',
      'projects.p3.objective': 'Deliver consistent, stylized avatars that reflect each pet\'s real traits in seconds — no illustrator, no manual work.',
      'projects.p3.decisions': 'Layered breed resolution (exact → substring → keywords → fallback to "mixed"), dedicated logic for orange cats (product branding), per-stage traceable logs (<code>[Vision]</code>, <code>[Match]</code>, <code>[Cache]</code>) and Oracle Cloud-ready with load balancer and health check.',
      'projects.p3.results': 'Endpoint <code>POST /api/avatar/match</code> returns <code>source</code>, <code>imageUrl</code>, <code>matchedAttributes</code> and <code>confidence</code>. Every generation enriches the catalog, cutting cost and future response times.',
      'projects.p3.alt.catalog': 'Self-populating catalog at assets/avatars with already-generated dog and cat avatars',
      'projects.p3.alt.postman': 'Endpoint response in Postman: source, imageUrl, matchedAttributes and confidence',
      'projects.p3.caption.1': 'Catalog · double write into <code>assets/avatars/</code>',
      'projects.p3.caption.2': 'Real test · response from <code>/api/avatar/match</code>',
      'projects.p3.aria.github': 'View Furl Life code on GitHub',
      'projects.p3.aria.docs': 'View Furl Life documentation',

      'projects.p4.title': 'FurLife — "Luna" AI Assistant in n8n',
      'projects.p4.desc': 'An <strong>n8n</strong> workflow that exposes a conversational assistant powered by <strong>Google Gemini</strong> and a proactive daily reminder system for next-day vet appointments.',
      'projects.p4.fn.1': 'Reactive chat via webhook with memory per <code>session_id</code>',
      'projects.p4.fn.2': 'Tool calling: Google Calendar + web search (Serper)',
      'projects.p4.fn.3': '<em>Action codes</em> telling the frontend which screen to open',
      'projects.p4.fn.4': 'Daily 8 AM reminder via Gmail',
      'projects.p4.fn.5': 'Warm copy with 🐾 emojis generated by a second agent',
      'projects.p4.fn.6': 'Local infrastructure with Docker Compose',
      'projects.p4.objective': 'Give the pet vertical a fast, low-cost conversational assistant that also proactively notifies the owner when their pet has an appointment the next day.',
      'projects.p4.challenges': 'Decouple AI and frontend through stable <em>action codes</em>, keep per-user memory and orchestrate two flows (reactive + proactive) on the same canvas without coupling them.',
      'projects.p4.decisions': 'Gemini Flash for latency and cost, memory per <code>session_id</code>, and JSON / text separation in a code node so the app reacts to stable codes even when the model\'s wording changes.',
      'projects.p4.caption.1': 'Flow 1 · Luna chat with tool calling',
      'projects.p4.caption.2': 'Live test · response with <code>action_code</code>',
      'projects.p4.alt.overview': 'Overview of the n8n workflow with the Luna Chat and Daily Reminder flows',
      'projects.p4.alt.flow': 'Flow 1 detail: Webhook → AI Agent (Gemini) with memory, search and calendar_manager → Code JS → Respond to Webhook',
      'projects.p4.alt.postman': 'Postman webhook test showing the response with status, response and action_code',
      'projects.p4.aria.github': 'View FurLife Luna code on GitHub',
      'projects.p4.aria.docs': 'View FurLife Luna documentation',

      'projects.p5.desc': '<strong>Public transport</strong> app for Manizales: quickly look up the city\'s <strong>bus routes</strong> in a clear, simple way. Available on <strong>App Store</strong>, <strong>Google Play</strong> and web.',
      'projects.p5.roleTitle': 'My contribution',
      'projects.p5.role.1': 'Research into the city\'s transport system',
      'projects.p5.role.2': 'Collection and structuring of route data',
      'projects.p5.role.3': 'Frontend development of the interface',
      'projects.p5.objective': 'Make getting around Manizales easier by giving people a simple way to find the bus route they need.',
      'projects.p5.platformsTitle': 'Platforms',
      'projects.p5.platforms': 'Cross-platform app published on the App Store and Google Play, with an informational website.',
      'projects.p5.tech.research': 'Research',
      'projects.p5.tech.data': 'Route data',
      'projects.p5.alt.logo': 'Punto Ruta Manizales logo: the Manizales Cathedral in gold on a maroon background',
      'projects.p5.site': 'Website',
      'projects.p5.appstore': 'App Store',
      'projects.p5.aria.site': 'Visit the Punto Ruta Manizales website',
      'projects.p5.aria.appstore': 'Download Punto Ruta on the App Store',

      // UPCOMING
      'upcoming.num': '04.b / In progress',
      'upcoming.title': 'Upcoming projects',
      'upcoming.lead': 'Holding space for what\'s coming.',
      'upcoming.1.tag': 'Automation',
      'upcoming.1.title': 'Enterprise workflow',
      'upcoming.1.desc': 'Internal pipelines to scale operations with AI and n8n orchestration.',
      'upcoming.2.tag': 'Dashboard',
      'upcoming.2.title': 'Actionable analytics',
      'upcoming.2.desc': 'Real-time visualization for marketing and product teams.',
      'upcoming.3.tag': 'Applied AI',
      'upcoming.3.title': 'Vertical assistant',
      'upcoming.3.desc': 'Industry-specialized agent with its own memory and tools.',
      'upcoming.4.tag': 'SaaS',
      'upcoming.4.title': 'Product in validation',
      'upcoming.4.desc': 'An idea blending automation and content for creators.',
      'upcoming.5.tag': 'Company',
      'upcoming.5.title': 'Client project',
      'upcoming.5.desc': 'Custom implementation in progress. Coming soon here.',

      // JOURNEY
      'journey.num': '05 / Journey',
      'journey.title': 'A path that evolves with technology.',
      'journey.1.phase': '2020 · Start',
      'journey.1.title': 'Professional Technician in Programming',
      'journey.1.body': 'Universidad Autónoma de Manizales. Solid foundations in programming, logic and systems.',
      'journey.2.phase': '2022 · Technologist',
      'journey.2.title': 'Systems Analysis and Development Technologist',
      'journey.2.body': 'Universidad Autónoma de Manizales. Analysis, programming and information systems development.',
      'journey.3.phase': '2022 – 2024 · Creative Studios SAS',
      'journey.3.title': 'SEO Analyst &amp; Frontend Developer',
      'journey.3.body': 'I joined in January 2022 as a 6-month professional intern and was hired from September 2022 until September 2024. Technical audits with Screaming Frog, Ahrefs and Semrush. Speed and structure optimization. Frontend with HTML, CSS and JavaScript. WordPress and Wix administration.',
      'journey.4.phase': 'Bootcamp · AI',
      'journey.4.title': 'Artificial Intelligence',
      'journey.4.body': 'AI fundamentals, basic model development and data analysis with Python.',
      'journey.5.phase': '2025 – 2026 · OrbidI',
      'journey.5.title': 'Web Implementer / WordPress Developer',
      'journey.5.body': 'WordPress + Crocoblock in production. Hosting management with cPanel, critical migrations (zero data loss), DNS zones and A/CNAME/TXT records. n8n flows to intercept CMS exceptions and classify emails automatically.',
      'journey.6.phase': 'In progress · Universidad de Manizales',
      'journey.6.title': 'Systems and Telecommunications Engineering',
      'journey.6.body': 'Eighth semester. Deepening into software architecture, networks, data and engineering to build solid, scalable digital products.',

      // CERTIFICATIONS
      'certs.num': '05.b / Certifications',
      'certs.title': 'Certified, verifiable training.',
      'certs.lead': 'Official credentials that back my learning with verifiable evidence.',
      'certs.view': 'View certificate',
      'certs.verify': 'Verify',
      'certs.ia.badge': 'Verifiable · auco.ai',
      'certs.ia.title': 'Artificial Intelligence · Basic Level',
      'certs.ia.issuer': '<strong>MinTIC</strong> · <strong>IU Training</strong> consortium — Universidad de Antioquia, Universidad de Caldas &amp; Ubicua Technology.',
      'certs.ia.meta.hours': '159 hours',
      'certs.ia.meta.date': 'March 2026',
      'certs.ia.meta.type': 'Bootcamp',
      'certs.ia.aria.view': 'View Artificial Intelligence certificate (PDF)',
      'certs.ia.aria.verify': 'Verify certificate authenticity on auco.ai',

      // CONTACT
      'contact.num': '06 / Contact',
      'contact.title': 'Let\'s talk about your next project.',
      'contact.lead': 'An idea? An integration? A collaboration? Write to me — I\'ll reply personally.',
      'contact.channels': 'Direct channels',
      'contact.signature': 'Available for new projects in 2026.',

      'form.name': 'Name',
      'form.email': 'Email',
      'form.topic': 'Topic',
      'form.message': 'Message',
      'form.namePh': 'Your full name',
      'form.emailPh': 'yourname@email.com',
      'form.messagePh': 'Briefly tell me how I can help',
      'form.topic.project': 'Project / quote',
      'form.topic.consultancy': 'Consultancy',
      'form.topic.collab': 'Collaboration',
      'form.topic.opportunity': 'Job opportunity',
      'form.topic.other': 'Other',
      'form.submit': 'Send message',
      'form.errors.fields': '› Please review the highlighted fields',
      'form.success': '› Opening your email client · just hit send',
      'form.subjectPrefix': 'Portfolio',
      'form.body.greeting': 'Hi Sofía,',
      'form.body.nameLabel': 'Name',
      'form.body.emailLabel': 'Email',
      'form.body.topicLabel': 'Topic',
      'form.body.from': 'Sent from your portfolio website.',

      'channel.email': 'Email',
      'channel.location': 'Location',
      'channel.location.value': 'Manizales, Colombia · available remote',
      'channel.aria.email': 'Email me',
      'channel.aria.linkedin': 'Visit LinkedIn',
      'channel.aria.github': 'Visit GitHub',
      'channel.aria.whatsapp': 'Message on WhatsApp',
      'channel.aria.location': 'Location',

      // FOOTER
      'footer.quote': 'Building smart solutions for the future.',
      'footer.tech': 'Built with HTML, CSS and JavaScript'
    }
  };

  // Cargos del typewriter — uno por idioma
  const ROLES_I18N = {
    es: [
      'WordPress Developer',
      'Automation Builder · n8n',
      'IA con Python',
      'SEO Técnico',
      'Future Software Engineer'
    ],
    en: [
      'WordPress Developer',
      'Automation Builder · n8n',
      'AI with Python',
      'Technical SEO',
      'Future Software Engineer'
    ]
  };

  /* ============================================================
     1 · AÑO DEL FOOTER — se actualiza solo
     ============================================================ */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();


  /* ============================================================
     6 · i18n — aplicar diccionario y manejar selector
     ============================================================ */
  let currentLang = 'es';
  let currentRoles = ROLES_I18N.es;

  const detectInitialLang = () => {
    const stored = localStorage.getItem('lang');
    if (stored === 'es' || stored === 'en') return stored;
    const nav = (navigator.language || 'es').slice(0, 2).toLowerCase();
    return nav === 'en' ? 'en' : 'es';
  };

  const applyTranslations = (lang) => {
    const dict = I18N[lang] || I18N.es;
    currentLang = lang;
    currentRoles = ROLES_I18N[lang] || ROLES_I18N.es;
    document.documentElement.lang = lang;

    const get = (key) => (key in dict ? dict[key] : null);

    // textContent
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const v = get(el.dataset.i18n);
      if (v !== null) el.textContent = v;
    });

    // innerHTML (cuando hay tags inline)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const v = get(el.dataset.i18nHtml);
      if (v !== null) el.innerHTML = v;
    });

    // alt
    document.querySelectorAll('[data-i18n-alt]').forEach(el => {
      const v = get(el.dataset.i18nAlt);
      if (v !== null) el.setAttribute('alt', v);
    });

    // placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const v = get(el.dataset.i18nPlaceholder);
      if (v !== null) el.setAttribute('placeholder', v);
    });

    // aria-label
    document.querySelectorAll('[data-i18n-aria-label]').forEach(el => {
      const v = get(el.dataset.i18nAriaLabel);
      if (v !== null) el.setAttribute('aria-label', v);
    });

    // title (tooltip)
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const v = get(el.dataset.i18nTitle);
      if (v !== null) el.setAttribute('title', v);
    });

    // meta content
    document.querySelectorAll('[data-i18n-content]').forEach(el => {
      const v = get(el.dataset.i18nContent);
      if (v !== null) el.setAttribute('content', v);
    });

    // Estado de botones de idioma
    document.querySelectorAll('.nav__lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('is-active', isActive);
      btn.setAttribute('aria-pressed', String(isActive));
    });

    // Si el toggle del menú móvil está abierto, mantén el aria-label correcto
    const toggle = document.getElementById('navToggle');
    if (toggle) {
      const open = toggle.classList.contains('is-open');
      toggle.setAttribute('aria-label', open ? dict['nav.aria.closeMenu'] : dict['nav.aria.openMenu']);
    }
  };

  // Inicialización temprana del idioma (antes de los demás módulos)
  applyTranslations(detectInitialLang());

  // Clicks en el selector
  document.querySelectorAll('.nav__lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      if (!lang || lang === currentLang) return;
      localStorage.setItem('lang', lang);
      applyTranslations(lang);
    });
  });


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
      const dict = I18N[currentLang] || I18N.es;
      toggle.setAttribute('aria-label', open ? dict['nav.aria.closeMenu'] : dict['nav.aria.openMenu']);
    });

    // Cierra el menú al hacer clic en cualquier enlace (no en los botones de idioma)
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
     ============================================================ */
  const roleEl = document.getElementById('roleType');

  if (roleEl && currentRoles.length) {
    let i = 0;
    let pos = 0;
    let deleting = false;
    let activeWord = currentRoles[0];

    const TYPE_DELAY   = 65;
    const DELETE_DELAY = 35;
    const HOLD_DELAY   = 1600;

    const tick = () => {
      // Si cambió el idioma a mitad de animación, reinicia desde cero con la nueva lista
      if (currentRoles !== ROLES_I18N[currentLang]) {
        // currentRoles ya fue actualizado por applyTranslations
        i = 0;
        pos = 0;
        deleting = false;
      }
      activeWord = currentRoles[i % currentRoles.length];

      if (!deleting) {
        pos++;
        roleEl.textContent = activeWord.slice(0, pos);
        if (pos === activeWord.length) {
          deleting = true;
          return setTimeout(tick, HOLD_DELAY);
        }
        return setTimeout(tick, TYPE_DELAY);
      } else {
        pos--;
        roleEl.textContent = activeWord.slice(0, pos);
        if (pos === 0) {
          deleting = false;
          i = (i + 1) % currentRoles.length;
        }
        return setTimeout(tick, DELETE_DELAY);
      }
    };
    tick();
  }


  /* ============================================================
     4 · REVEAL ON SCROLL
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
    reveals.forEach(el => el.classList.add('is-visible'));
  }


  /* ============================================================
     5 · FORMULARIO DE CONTACTO
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
      const dict = I18N[currentLang] || I18N.es;

      const name    = form.elements['name'];
      const email   = form.elements['email'];
      const topic   = form.elements['topic'];
      const message = form.elements['message'];

      [name, email, message].forEach(f => setError(f, false));

      let ok = true;
      if (!name.value.trim()) { setError(name, true); ok = false; }
      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      if (!emailOk) { setError(email, true); ok = false; }
      if (message.value.trim().length < 10) { setError(message, true); ok = false; }

      if (!ok) {
        status.textContent = dict['form.errors.fields'];
        status.className = 'contact__status is-error';
        return;
      }

      const topicLabel = topic.options[topic.selectedIndex].text;
      const subject = `[${dict['form.subjectPrefix']}] ${topicLabel} · ${name.value.trim()}`;
      const body =
        `${dict['form.body.greeting']}\n\n` +
        `${message.value.trim()}\n\n` +
        `— — — — — — — — — — —\n` +
        `${dict['form.body.nameLabel']}: ${name.value.trim()}\n` +
        `${dict['form.body.emailLabel']}: ${email.value.trim()}\n` +
        `${dict['form.body.topicLabel']}:   ${topicLabel}\n` +
        `${dict['form.body.from']}`;

      const mailto = `mailto:${INBOX_EMAIL}` +
        `?subject=${encodeURIComponent(subject)}` +
        `&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;

      status.textContent = dict['form.success'];
      status.className = 'contact__status is-ok';
    });
  }

})();
