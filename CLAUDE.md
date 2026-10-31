# Web de Taberna Tomasa

## Objetivo

Web de identidad digital para **Taberna Tomasa**, taberna y tienda de ultramarinos en Valdeprados (Segovia), llevada por Victoria y Mariano.

Qué tiene que conseguir la web:

- Que el negocio tenga presencia propia en internet, más allá de Instagram y Google Maps.
- Que quien la abra pueda **llamar para reservar** con un toque, sobre todo desde el móvil, y sepa **cómo llegar** y **cuándo está abierto**.
- Que los dueños se sientan identificados: los textos van en **primera persona del plural** ("nosotros") y tratan al cliente de **vosotros**, con el tono cercano de sus respuestas a las reseñas.

Qué NO es:

- No hay sistema de reservas: se reserva por teléfono (921 06 25 16).
- No hay base de datos, backend, CMS ni formularios.
- Es un sitio estático que se despliega en Vercel y funciona sin mantenimiento.

## Estructura

```
taberna-tomasa-web/
├── index.html      # Página única con todas las secciones
├── css/styles.css  # Estilos mobile-first, corte de escritorio a 900px
├── js/main.js      # Menú hamburguesa, pestañas de la carta y estado "abierto ahora"
├── img/            # Fotos (JPG)
└── vercel.json     # Cabeceras de caché y seguridad
```

Sin build, sin dependencias, sin framework. HTML, CSS y JS vanilla.

## Secciones (en orden, con su ancla)

1. `#inicio`: portada a pantalla completa con la foto del interior, el nombre y "Taberna y tienda · Valdeprados, Segovia". Poco texto y mucha imagen.
2. Estado de hoy ("Estamos abiertos", "Hoy abrimos" o "Ahora estamos cerrados") y una tira horizontal de fotos que se desliza con el dedo.
3. `#casa`: "Nuestra casa", el texto de los dueños firmado por Victoria y Mariano.
4. `#carta`: "Lo que cocinamos", con pestañas Raciones / Ensaladas y tostas / Postres / Fuera de carta. Sin precios.
5. `#tienda`: la tienda de ultramarinos.
6. `#opiniones`: tres reseñas reales de Google, citadas literalmente.
7. `#donde`: dirección, enlace a Maps, Instagram, horario con el día de hoy resaltado y datos prácticos.
8. Pie: "Nos vemos pronto en Tomasa."

Elementos fijos:

- **Cabecera sticky** con el nombre a la izquierda y el **menú hamburguesa** a la derecha (en móvil y en escritorio). Despliega un índice oscuro con las 6 secciones más el teléfono, Instagram y la dirección. Se cierra al pulsar un enlace, con Escape o al pulsar fuera.
- **Botón fijo abajo "Llámanos y reserva"** (`tel:+34921062516`), siempre visible al hacer scroll en móvil y en escritorio. Es una pieza clave de la web: no quitarlo.

## Diseño

Moderno, minimalista y con aire rústico y rural. Nada de estética genérica "de IA".

- Tipografía: **Schibsted Grotesk** (Google Fonts), una sola familia. Títulos en minúscula con punto final, peso 500 y tracking negativo. Nada de títulos en mayúsculas ni etiquetas pequeñas en mayúsculas encima de cada título.
- Colores (variables en `:root` de `styles.css`):
  - `--cal` `#EFE7D8`: fondo, pared encalada.
  - `--ink` `#2A211A`: texto.
  - `--muted` `#6E6153`: texto secundario.
  - `--teja` `#8E3F24`: acento, botón de reserva, pestaña activa y día de hoy.
  - `--cream` `#F7EFE2`: texto sobre teja u oscuro.
- Botón de reserva color teja con filete crema interior (`box-shadow` inset), como un letrero pintado.
- Sin sombras, sin degradados decorativos (solo el oscurecido inferior de la portada para que se lea el título), sin emojis y sin tarjetas con iconos. Separadores de 1px.
- Escritorio (≥900px): cada sección es una rejilla de 12 columnas, con la etiqueta en 3 columnas a la izquierda y el contenido en 9.
- Accesibilidad: áreas táctiles de 44px como mínimo, contraste AA, pestañas con roles ARIA y flechas de teclado, y `alt` en todas las fotos.

## Probar en local

```bash
# cualquier servidor estático vale
npx serve .
# o
python3 -m http.server 8000
```

Las rutas son relativas, así que abrir `index.html` directamente en el navegador también funciona.

## Desplegar en Vercel

1. Sube la carpeta a un repo de GitHub.
2. En Vercel: **Add New → Project → Import** el repo.
3. Framework Preset: **Other**. Build Command: vacío. Output Directory: `.` (raíz).
4. Deploy. Sin variables de entorno.
5. Dominio propio (por ejemplo `tabernatomasa.es`): en **Settings → Domains**, añádelo y configura los DNS que indique Vercel.

También se puede desplegar sin GitHub con `npx vercel --prod` desde la carpeta.

## Pendientes y mejoras (tareas para Claude Code)

- [ ] **Optimizar imágenes**: generar versiones WebP/AVIF y `srcset` (por ejemplo 640/1200/2000 px). Ahora `img/interior.jpg` pesa unos 840 KB.
- [ ] **Fotos de platos en mejor resolución**: `croquetas`, `tortilla`, `migas`, `torreznos`, `tarta` y `ensalada` son de 215×280 px. Pedir originales a los dueños.
- [ ] **Dominio definitivo**: actualizar `<link rel="canonical">` y poner URLs absolutas en `og:image` y en el `"image"` del JSON-LD.
- [ ] **Imagen para compartir**: crear una `og-image.jpg` de 1200×630.
- [ ] **Favicon** con el rótulo real si nos dan logo. Ahora es una "T" en SVG.
- [ ] **Carta completa**: si nos pasan la carta en texto, sustituir la lista actual (sacada de reseñas) y valorar si poner precios.
- [ ] **Revisar textos con Victoria y Mariano** antes de publicar, sobre todo "Nuestra casa" y las descripciones de platos.
- [ ] Añadir `robots.txt` y `sitemap.xml` sencillos.
- [ ] Opcional: aviso legal y política de cookies. Si no se añaden analíticas ni cookies, basta con un aviso legal mínimo con los datos del titular.

## Reglas al modificar

- Mantener el sitio **estático y sin dependencias**: nada de frameworks, bundlers ni backend salvo que se pida.
- El **horario** se edita solo en el HTML (`#hours li` con `data-day`, `data-open` y `data-close`). El JS calcula el estado de hoy a partir de ahí, en hora de Madrid. Los días van de 0 (domingo) a 6 (sábado).
- El **teléfono** aparece en `tel:+34921062516` en la cabecera/menú, en el botón fijo y en el JSON-LD. Si cambia, buscar y reemplazar en todos.
- Los textos siempre en primera persona del plural, tuteando en plural (vosotros) y en castellano de España.
- No inventar datos (precios, premios, cifras). Si falta algo, dejar un `[PENDIENTE: ...]` visible y avisar.
- Probar siempre a 375px y a 1366px de ancho.

## Datos del negocio

- **Nombre**: Taberna Tomasa
- **Dirección**: Calle Otero, 10, 40423 Valdeprados (Segovia)
- **Teléfono de reservas**: 921 06 25 16
- **Horario**: jueves, viernes y sábado de 11:00 a 23:00. Domingo de 11:00 a 18:00. De lunes a miércoles, cerrado.
- **Instagram**: https://www.instagram.com/tabernatomasa/
- **Propietarios**: Victoria y Mariano
- **Servicios**: terraza, comida para llevar, pago con tarjeta y NFC, accesible para sillas de ruedas (entrada, mesas y aseo), aparcamiento gratuito en la calle. Se recomienda reservar.
