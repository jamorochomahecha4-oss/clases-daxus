# De Luz Hotel: web oficial

Documento de proyecto. Cualquier sesión que trabaje en este repositorio debe leerlo primero y respetar sus decisiones.

## Forma de trabajar
- Idioma de trabajo y de la web: **español** (versión en inglés opcional, pendiente de decidir).
- Proyecto por fases; no avanzar de fase sin aprobación del cliente:
  1. Descubrimiento ✅
  2. Dirección creativa ✅ (concepto aprobado)
  3. Arquitectura y UX ✅ (propuesta en `propuesta/`)
  4. Desarrollo de la versión de producción 🔧 en curso (estructura, fichas, SEO y mapa hechos; faltan datos del cliente)
  5. Revisión, optimización y publicación
- **No inventar** instalaciones, servicios, vistas ni datos. Lo no confirmado se marca con la clase `tbd` (subrayado punteado) o la etiqueta `tag-tbd`.
- **No usar fotos de stock** como si fueran del hotel. Solo fotos reales (`fotos-originales/`).
- No simular reservas: la conversión es una **consulta por WhatsApp** con el mensaje pre-redactado.
- No cambiar la identidad visual sin consultar. Si llega un logo, la paleta se ajusta a él.

## Estructura del repositorio
| Ruta | Qué es |
|---|---|
| `index.html` | Página de inicio. Lleva `noindex` hasta el lanzamiento. |
| `habitaciones/doble/index.html` | Ficha de la Habitación Doble (fotos, características, consulta, preguntas frecuentes). |
| `habitaciones/estudio/index.html` | Ficha del Estudio con cocineta. |
| `404.html` | Página de error (Cloudflare Pages la usa automáticamente). |
| `assets/css/site.css` | Todos los estilos. Tokens de color en `:root`. |
| `assets/js/site.js` | Todos los scripts. **Número de WhatsApp y nombre del hotel en la parte superior** (`WHATSAPP`, `HOTEL`). |
| `img/` | Fotos web (WebP 1600 px). `img/800/`: versiones para móvil (se sirven con `srcset`). |
| `fotos-originales/` | Fotos originales en alta resolución. Fuente para recortes nuevos. |
| `favicon.svg` | Icono provisional (lámpara de mimbre con rayos) hasta que exista logo. |
| `robots.txt`, `sitemap.xml` | Para buscadores. **Ajustar dominio** al comprarlo. |
| `_headers` | Caché y cabeceras de seguridad para Cloudflare Pages / Netlify. |
| `propuesta/index.html` | Propuesta creativa "Luz tejida". Uso interno (bloqueada en `robots.txt`). |

Sitio estático: HTML + CSS + JS sin dependencias ni paso de compilación. Fuentes desde Google Fonts.
Encabezado, pie, panel de WhatsApp y visor de fotos están repetidos en cada HTML: **si se cambian, cambiarlos en las 4 páginas**.

### Cómo agregar fotos nuevas
1. Guardar el original en `fotos-originales/nombre-claro.jpg`.
2. Crear `img/nombre-claro.webp` (1600 px lado mayor, calidad 74) e `img/800/nombre-claro.webp` (800 px, calidad 72).
3. Usar `<img src="img/x.webp" srcset="img/800/x.webp ANCHO800w, img/x.webp ANCHOw" sizes="…" width height alt loading="lazy">`.
4. En la galería, cada foto es un `<button data-c="hab|coc|ban|edi" data-full="img/x.webp">` con `<img>` y `<span>` de título.

## Datos del hotel (verificados)
- **Nombre:** De Luz Hotel. En plataformas aparece "De Luz Hotel" (separado); el cliente escribió "Deluz". **Confirmar forma oficial.**
- **Ubicación:** El Limón, Samaná 32000, República Dominicana.
- **Coordenadas:** 19.2942143, -69.4327929.
- **Google Maps:** https://www.google.com/maps/place/De+Luz+Hotel/@19.2942143,-69.4327929,17z/data=!3m1!4b1!4m6!3m5!1s0x8eaee575bb2371f7:0xa61d08177c4b8f41!8m2!3d19.2942143!4d-69.4327929
- **Teléfono:** +1 809 484 9331 (usado como WhatsApp: `https://wa.me/18094849331`). **Confirmar que tiene WhatsApp.**
- **Fuentes de datos:** fichas en Expedia (h36192376), Hotels.com, Kayak, Momondo.
- **Servicios según plataformas:** piscina al aire libre, wifi gratis, parqueo gratis, gimnasio, terraza, jardín, parrillas, admite mascotas (perros y gatos hasta 10 kg), traslado al aeropuerto con costo extra, se acepta efectivo. Sin restaurante de desayuno.
- **Check-in:** 3:00 – 8:00 p. m. Check-out: pendiente.
- **Cercanías:** Salto El Limón (el más cercano), Playa Morón, Las Terrenas, Santa Bárbara de Samaná (≈ 13 km), Aeropuerto El Catey AZS (≈ 32 km).
- **Valoraciones:** 6.0/10 en Expedia y Hotels.com; 7.8/10 en Momondo. Quejas puntuales de agua caliente. **Decisión: no mostrar la puntuación en la web**; solo citas reales positivas cuando se aprueben.

## Lo que muestran las fotos
- Edificio blanco de 3 plantas, ventanales con marco negro, franja de travertino, puertas de madera, árboles jóvenes.
- **Habitación Doble:** 2 camas queen con base de madera, lámparas colgantes de mimbre, aire acondicionado, TV, perchero abierto con repisa, mesitas flotantes.
- **Estudio con cocineta:** 2 camas queen, cocineta a gas de 2 hornillas, nevera, mesa con 4 sillas, ventanal con vegetación. Cocineta en negro o en azul añil.
- Baños: porcelanato imitación madera, ducha a ras de suelo, lavabo flotante.
- **Faltan fotos de:** piscina, gimnasio, terraza, jardín, entrada con letrero, entorno.

## Concepto creativo: "Luz tejida" (aprobado)
El hotel tiene dos caras: **de día** blanco, fresco y verde; **de noche** ámbar, madera y mimbre.
- **Motivo de marca:** los rayos de sombra que proyectan las lámparas de mimbre. Se recrea en CSS con `repeating-conic-gradient` + máscara radial (clase `.rays`). Sin imágenes extra.
- **Sello de interacción:** interruptor **De día / De noche** en la portada.
- Tono: honesto, cálido, caribeño contemporáneo. Nada de lujo aparente ni clichés turísticos.

### Paleta (tokens en `:root` de `index.html`)
| Token | Hex | Origen | Uso |
|---|---|---|---|
| `--cal` | #F4F4F1 | muros | fondo base |
| `--tinta` | #1F2326 | marcos de ventana | texto |
| `--teca` | #A85E2A | puertas | botón principal |
| `--mimbre` | #E0A95B | luz de lámparas | acentos de noche |
| `--noche` | #17130F | habitación de noche | bandas oscuras, pie |
| `--piedra` | #DDD5C7 | travertino | fondos de apoyo |
| `--palma` | #3D6B4B | vegetación | uso puntual |
| `--anil` | #3B5B7D | cocineta azul | reserva |
WhatsApp usa verde propio `#1f7a4d` solo en sus botones.

### Tipografía
- Títulos: **Bricolage Grotesque** (600/800).
- Texto: **Instrument Sans** (400/500/600).

### Componentes
Botones píldora (principal teca, WhatsApp verde, fantasma con borde); flecha que se desplaza al pasar el cursor; tarjetas de habitación con deslizador de fotos; galería con filtros y visor; mapa esquemático con rayos hacia los lugares cercanos y rutas reales de Google Maps; barra fija "Consultar" en móvil; aparición suave al hacer scroll (respeta `prefers-reduced-motion`).

## Arquitectura aprobada
Inicio de una sola página: Portada + consulta → Lo esencial → Habitaciones → De día / de noche → El hotel → Galería → Ubicación → Contacto.
Páginas aparte (Fase 4): `/habitaciones/doble`, `/habitaciones/estudio`; opcionales `/en`, `/politicas`.

## Hecho en la Fase 4
- [x] Código separado en `assets/css/site.css` y `assets/js/site.js`.
- [x] Fichas `/habitaciones/doble/` y `/habitaciones/estudio/` con consulta, fotos y preguntas frecuentes (solo datos verificados).
- [x] Mapa real de Google embebido (carga diferida) + pestaña "Alrededores" con el esquema de rayos.
- [x] SEO base: títulos y descripciones por página, JSON-LD `Hotel` (sin puntuación) y `BreadcrumbList`, Open Graph, favicon, `robots.txt`, `sitemap.xml`.
- [x] Imágenes responsive (`srcset` 800/1600, `width`/`height`, `lazy`) y precarga de la portada.
- [x] Accesibilidad: enlace "Saltar al contenido", foco visible, Escape cierra menú, visor y panel.
- [x] Página 404 y cabeceras de caché (`_headers`).

## Pendientes (dependen del cliente)
- [ ] Forma oficial del nombre (De Luz / Deluz) y logotipo. Hoy: SEO usa "De Luz Hotel"; el logotipo provisional dice "Deluz".
- [ ] Confirmar WhatsApp en +1 809 484 9331; correo de contacto (hoy marcado `tbd`).
- [ ] Tipos de habitación (Expedia lista 5), número total y **capacidad** de cada tipo (hoy `tbd`).
- [ ] Baño privado en todas; agua caliente resuelta; hora de check-out; otros métodos de pago.
- [ ] Historia y años de trayectoria (párrafo `tbd` en "El hotel").
- [ ] Fotos de piscina (candidata a portada "De día"), gimnasio, terraza, jardín, entrada, entorno.
- [ ] Versión en inglés (decidir).

## Checklist de lanzamiento
- [ ] Comprar dominio y conectar Cloudflare Pages (rama de producción `main`).
- [ ] Reemplazar `deluzhotel.com` en `robots.txt` y `sitemap.xml` si el dominio es otro.
- [ ] Convertir a URL absoluta `og:image` y las `image` del JSON-LD; añadir `<link rel="canonical">` y `og:url`.
- [ ] Quitar `<meta name="robots" content="noindex">` de las 4 páginas.
- [ ] Añadir la web en el Perfil de Empresa de Google y en Search Console; enlazar desde Booking/Expedia/redes.

## Publicación (plan)
Hosting estático en **Cloudflare Pages** conectado a este repositorio (también valen Netlify o Vercel). Rama de producción: `main`. Cada push publica automáticamente. Dominio propuesto: `deluzhotel.com` (a nombre del hotel).
