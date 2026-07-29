# 🎨 Análisis Visual del Portafolio — Sergio Villena

> Documento de referencia para replicar la identidad visual del portafolio en materiales adicionales (tarjetas de presentación, CVs, presentaciones, etc.)

---

## 1. Identidad de Marca

| Elemento | Valor |
|---|---|
| **Nombre** | Sergio Villena |
| **Título profesional** | Ingeniero Civil en Informática |
| **Posicionamiento** | Full Stack · IA aplicada · GIS · Infraestructura |
| **Ubicación** | Chile |
| **Tono visual** | Premium técnico, minimalista, dark-mode-first |
| **URL del sitio** | sergiovillena.dev |

---

## 2. Paleta de Colores

### 2.1 Colores Principales

| Nombre | Hex | Uso |
|---|---|---|
| **Sky 500** (Primary) | `#0EA5E9` | Acentos principales, links, badges activos, separadores |
| **Violet 500** (Secondary) | `#8B5CF6` | Acentos secundarios, gradientes |
| **Slate 950** (Background) | `#020617` | Fondo principal, profundo |
| **Slate 900** (Dark) | `#0F172A` | Fondo de cards, paneles |
| **White** | `#FFFFFF` | Títulos, botones principales |

### 2.2 Colores de Texto

| Clase Tailwind | Hex aproximado | Uso |
|---|---|---|
| `text-white` | `#FFFFFF` | Títulos H1-H3, métricas |
| `text-slate-200` | `#E2E8F0` | Texto del body |
| `text-slate-300` | `#CBD5E1` | Texto secundario, badges |
| `text-slate-400` | `#94A3B8` | Descripciones, párrafos |
| `text-slate-500` | `#64748B` | Labels, metadatos, subtítulos |
| `text-blue-400/500` | `#60A5FA / #3B82F6` | Etiquetas de sección, indicadores activos |

### 2.3 Colores de Acento por Categoría

| Categoría | Color | Hex |
|---|---|---|
| Lenguajes / Código | Blue | `#3B82F6` |
| Web Stack | Emerald | `#10B981` |
| Infra & DevOps | Purple | `#A855F7` |
| Data & GIS | Amber | `#F59E0B` |
| AI & Automation | Rose | `#F43F5E` |
| Tools & SEO | Teal | `#14B8A6` |

### 2.4 Gradientes Utilizados

- **Text Gradient:** `linear-gradient(to bottom right, #fff 30%, #94a3b8)` — aplicado al título H1 del Hero
- **Mesh Gradient (fondo fijo):**
  - `radial-gradient(at 0% 0%, rgba(30, 58, 138, 0.2) 0px, transparent 50%)`
  - `radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.15) 0px, transparent 50%)`
  - `radial-gradient(at 50% 100%, rgba(30, 64, 175, 0.2) 0px, transparent 50%)`
- **Badge Premium Gradient:** `linear-gradient(90deg, rgba(59,130,246,0.1), rgba(99,102,241,0.1))`
- **Scanner Line:** `linear-gradient(to right, transparent, #3b82f6, transparent)`
- **Separator Line:** `linear-gradient(to-r, transparent, rgba(59,130,246,0.3), transparent)`

---

## 3. Tipografía

### 3.1 Fuente Principal

| Propiedad | Valor |
|---|---|
| **Familia** | Inter Variable |
| **Fallback** | `sans-serif` |
| **Importación** | `@fontsource-variable/inter` |
| **CSS** | `font-family: 'Inter Variable', sans-serif` |

### 3.2 Jerarquía Tipográfica

| Elemento | Clases Tailwind | Tamaño | Peso | Estilo |
|---|---|---|---|---|
| **H1 Hero** | `text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black` | 2.25rem → 4.5rem | 900 | text-gradient (blanco a gris), tracking-tight, leading-[1.0] |
| **H2 Secciones** | `text-3xl sm:text-5xl font-black` | 1.875rem → 3rem | 900 | tracking-tight, italic, uppercase |
| **H3 Tarjetas** | `text-2xl sm:text-3xl font-black` | 1.5rem → 1.875rem | 900 | tracking-tight |
| **Subtítulos** | `text-lg text-slate-300/400 font-light` | 1.125rem | 300 | leading-relaxed |
| **Párrafos** | `text-sm text-slate-300/400` | 0.875rem | 400 | leading-relaxed |
| **Labels / Tags** | `text-xs font-black uppercase tracking-widest` | 0.75rem | 900 | uppercase, tracking-[0.18em] a tracking-[0.24em] |
| **Badges pequeños** | `text-[10px] font-black uppercase tracking-widest` | 10px | 900 | tracking-widest |
| **Métricas** | `text-xl/2xl font-black text-white` | 1.25rem / 1.5rem | 900 | numérico, stark |
| **Botones primarios** | `text-sm font-black uppercase tracking-widest` | 0.875rem | 900 | uppercase |

### 3.3 Convenciones de Texto

- **Tracking extenso** en labels: `tracking-widest` (0.1em) a `tracking-[0.24em]`
- **Uso extensivo de UPPERCASE** en labels, badges y navegación
- **Font-weight 900 (black)** en títulos y elementos de impacto
- **Font-weight 300 (light)** en descripciones y body text
- **Tracking tight** en títulos principales (H1, H2, H3)

---

## 4. Sistema de Espaciado y Layout

### 4.1 Contenedores

- **Max-width principal:** `max-w-7xl` (1280px) — para la mayoría de secciones
- **Max-width reducido:** `max-w-6xl` (1152px) — para trayectoria
- **Padding horizontal:** `px-4 sm:px-6 lg:px-8`
- **Padding vertical de secciones:** `py-28` (112px) — estándar
- **Gap entre elementos:** `gap-6` (24px) a `gap-8` (32px)

### 4.2 Grid System

- **Hero:** `grid-cols-1 lg:grid-cols-12` (7/5 split)
- **Skills:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Projects:** `grid-cols-1 lg:grid-cols-2` (con featured: `lg:col-span-2`)
- **Contact:** `grid-cols-1 lg:grid-cols-[0.9fr_1.1fr]`
- **Experience:** `grid-cols-1 lg:grid-cols-[1fr_0.85fr]`

### 4.3 Border Radius

| Elemento | Radius | Clase |
|---|---|---|
| **Cards principales** | 2.5rem (40px) | `rounded-[2.5rem]` |
| **Botones principales** | 1rem (16px) | `rounded-2xl` |
| **Botones secundarios** | 0.5rem (8px) | `rounded-lg` |
| **Badges / Pills** | 9999px | `rounded-full` |
| **Thumbnails** | 0.5rem (8px) | `rounded-lg` |
| **Imagen Hero** | 2rem (32px) | `rounded-[2rem]` |
| **Icon containers** | 1rem (16px) | `rounded-2xl` |
| **Avatar/logo** | 0.75rem (12px) | `rounded-xl` |

---

## 5. Efectos Visuales

### 5.1 Glassmorphism (Glass Cards)

```css
.glass-card {
  background: rgba(15, 23, 42, 0.4);       /* slate-900 con 40% opacidad */
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  border-color: rgba(59, 130, 246, 0.4);   /* blue-500 border */
  transform: translateY(-8px);               /* elevación en hover */
  background: rgba(15, 23, 42, 0.6);
}
```

### 5.2 Grid Pattern (Fondo)

```css
.grid-pattern {
  background-image: radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.07) 1px, transparent 0);
  background-size: 32px 32px;
}
```

Puntos sutiles de color azul sobre fondo oscuro, creando una cuadrícula tech/futurista.

### 5.3 Mesh Gradient (Fondo fijo)

Gradientes radiales superpuestos en la parte superior, centro-derecha e inferior, creando un efecto de iluminación ambiental azul profundo.

### 5.4 Scanner Line (Animación)

Línea horizontal que recorre verticalmente con glow azul, usada como efecto decorativo.

### 5.5 Glow Effects

```css
@keyframes glow-pulse {
  0%, 100% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.4); }
  50%      { box-shadow: 0 0 20px rgba(59, 130, 246, 0.8); }
}
```

### 5.6 Shadow System

- **Cards:** `shadow-2xl shadow-blue-950/40` (sombra con tinte azul)
- **Botones:** `shadow-blue-600/20` (glow azul sutil)
- **Inset shadows en imágenes:** `shadow-[inset_0_0_24px_rgba(2,6,23,0.85)]`

### 5.7 Bordes y Separadores

- **Bordes de cards:** `border border-white/10` (5% opacidad blanca)
- **Bordes activos/hover:** `border-white/25` a `border-blue-500/50`
- **Separadores de sección:** gradiente horizontal azul transparente con punto central
- **Footer:** `border-t border-white/5`

---

## 6. Iconografía

| Librería | Lucide React |
|---|---|
| **Iconos usados** | Activity, ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, BarChart3, Bot, BriefcaseBusiness, Code2, Download, Github, Globe, GraduationCap, Lock, Linkedin, Mail, MapPin, Maximize2, Menu, Send, Server, ServerCog, Sparkles, Terminal, Wrench, X |
| **Tamaño estándar** | `w-4 h-4` / `w-5 h-5` / `h-6 w-6` / `w-7 h-7` |
| **Color** | Hereda del contenedor (text-slate-300, text-blue-500, text-blue-300, etc.) |
| **Uso principal** | Badges, botones de acción, iconos de contacto, skills, navegación |

### Logo / Marca personal

El logo del navbar usa un ícono `Terminal` dentro de un contenedor cuadrado:
```
w-9 h-9 rounded-xl bg-slate-900 border border-slate-700/50
```
Color hover: `text-blue-400 border-blue-500/30`

---

## 7. Botones y CTAs

### 7.1 Botón Primario

```
bg-white text-slate-950 font-black rounded-2xl
hover:scale-105 transition-transform shadow-2xl
```
Efecto: hover con escala sutil (1.05).

### 7.2 Botón Secundario / Glass

```
bg-slate-900/60 text-white font-bold rounded-2xl
hover:bg-slate-800 transition-all border border-white/10
backdrop-blur
```

### 7.3 Botón de Navegación / Ghost

```
glass-card rounded-lg
hover:text-white hover:border-blue-500/50
```

### 7.4 Botón de Contacto / Envío

```
bg-blue-500 hover:bg-blue-400 shadow-blue-600/20
text-white font-black uppercase tracking-widest
rounded-lg
```
Estados: idle (azul), sending (azul deshabilitado), success (emerald), error (rose).

---

## 8. Animaciones y Transiciones

| Elemento | Tipo | Detalle |
|---|---|---|
| **Hero text** | CSS `fadeInUp` | 0.8s ease-out, translateY(30px) → 0 |
| **Hero image** | CSS `fadeInScale` | 0.8s ease-out 0.2s, scale(0.94) → 1 |
| **Secciones** | Framer Motion `whileInView` | opacity: 0→1, y: 20→0, 0.6s |
| **Cards skills** | Stagger children | 0.08s entre cada card |
| **Glass card hover** | CSS transition | 0.4s cubic-bezier, translateY(-8px) |
| **Nav indicator** | Framer Motion layoutId | Spring animation (stiffness: 300, damping: 30) |
| **Navbar scroll** | CSS transition | 300ms, bg-slate-950/80 + backdrop-blur-xl |
| **Project modal** | Framer Motion | opacity + y + scale, 0.25s |
| **Image slides** | Framer Motion custom | x: ±80, scale: 0.96, spring transition |
| **Badge pulse** | CSS `animate-pulse` | Punto verde pulsante |
| **Glow pulse** | CSS keyframes | box-shadow de 8px a 20px en 2s |

---

## 9. Estructura de Componentes

### Layout General

```
┌─────────────────────────────────────┐
│  Navbar (fixed, glass on scroll)    │
├─────────────────────────────────────┤
│  Hero (grid 7/5)                    │
│  ├── Texto principal + CTAs         │
│  └── Foto + Stats panel             │
├─────────────────────────────────────┤
│  Skills (grid 3 cols)               │
│  └── 6 glass cards con categorías   │
├─────────────────────────────────────┤
│  Projects (grid 2 cols)             │
│  └── Cards con imagen + métricas    │
├─────────────────────────────────────┤
│  Experience (grid 2 cols)           │
│  ├── Timeline izquierda             │
│  └── Formación derecha              │
├─────────────────────────────────────┤
│  Contact (grid 2 cols)              │
│  ├── Links izquierda                │
│  └── Formulario derecha             │
├─────────────────────────────────────┤
│  Footer (border-top)                │
└─────────────────────────────────────┘
```

---

## 10. Tokens de Diseño para Tarjeta de Presentación

### Valores exactos para replicación

| Token | Valor |
|---|---|
| **Fondo oscuro** | `#020617` (slate-950) |
| **Fondo card** | `#0F172A` (slate-900) con 40% opacidad |
| **Borde sutil** | `rgba(255,255,255,0.05)` → `rgba(255,255,255,0.1)` |
| **Borde accent** | `rgba(59,130,246,0.4)` |
| **Azul primario** | `#0EA5E9` |
| **Azul claro** | `#60A5FA` (blue-400) |
| **Azul fuerte** | `#3B82F6` (blue-500) |
| **Violeta** | `#8B5CF6` |
| **Blanco puro** | `#FFFFFF` |
| **Gris claro texto** | `#CBD5E1` (slate-300) |
| **Gris medio texto** | `#94A3B8` (slate-400) |
| **Gris oscuro label** | `#64748B` (slate-500) |
| **Blur** | 20px (backdrop-filter) |
| **Sombra card** | `0 25px 50px -12px rgba(15, 23, 42, 0.4)` + tint azul |

---
---

# 🪪 Prompt para Generación de Tarjeta de Presentación

> **Objetivo:** Generar una imagen de tarjeta de presentación (business card) que refleje fielmente el estilo visual del portafolio de Sergio Villena.

---

## Prompt (Versión para IA generadora de imágenes — Midjourney / DALL·E / Ideogram)

```
Design a premium, dark-themed business card for "Sergio Villena", a Full Stack Engineer
and Civil Informatics Engineer based in Chile. The card must feel like a physical extension
of a modern, high-end developer portfolio website.

STYLE DIRECTION:
- Ultra-minimalist, dark mode aesthetic — the entire card should feel like it was extracted
  from a premium SaaS dashboard or developer portfolio
- Clean geometric layout with generous whitespace
- The overall mood is: sophisticated tech professional, not flashy, not playful —
  precise, confident, and understated
- Think: "developer-focused dark UI" meets "premium brand identity"

COLOR PALETTE (strict):
- Card background: deep navy-black (#020617, slate-950)
- Primary accent: electric sky blue (#0EA5E9 / #3B82F6)
- Secondary accent: soft violet (#8B5CF6)
- Text: pure white (#FFFFFF) for the name, light gray (#CBD5E1 / #94A3B8) for secondary text
- Subtle borders: very faint white lines at 5-10% opacity
- No bright colors except the blue accent — keep everything muted and dark

TYPOGRAPHY STYLE:
- Name "Sergio Villena" in a bold, modern sans-serif font (Inter, SF Pro, or similar),
  uppercase or mixed case, tracked/tight letter-spacing, white
- Title "Ingeniero Civil en Informática" in a smaller, lighter weight,
  uppercase, wide letter-spacing (tracking-widest), gray (#94A3B8)
- Tagline area with very small uppercase text: "Full Stack · IA Aplicada · GIS · Infraestructura"
  in sky blue (#0EA5E9) with extreme letter-spacing

LAYOUT (Landscape card, standard 3.5" x 2" ratio or 90mm x 50mm):

FRONT SIDE:
- Left side or center: Name "Sergio Villena" in large bold white text, clean and prominent
- Below the name: "Ingeniero Civil en Informática" in small uppercase gray text
- Bottom area or subtle line: four skill categories separated by dots or thin lines:
  "Full Stack · IA Aplicada · GIS · Infraestructura" in sky blue
- A very subtle glass-card effect on the card surface: slight transparency with a hint
  of blur or frosted glass, barely perceptible
- Optional: a tiny terminal icon (monospaced ">") in a small rounded square container,
  placed near the name as a personal brand mark — dark background with blue icon
- The background should have an extremely subtle grid pattern of tiny dots (like a
  technical graph paper but barely visible — 32px spacing, blue-tinted dots at 7% opacity)
  and/or a very soft radial gradient glow in dark blue, emanating from the top-left corner

BACK SIDE (or second design option):
- Centered layout with the terminal icon/brand mark at top
- Name centered below in bold white
- Contact details stacked vertically, small text, gray:
  - Email icon + sergio.villena.vergara@gmail.com
  - LinkedIn icon + linkedin.com/in/sergio-villena-vergara
  - GitHub icon + github.com/SAVillena
  - Location icon + Chile
- Icons should be thin, minimal, line-style (Lucide/Feather aesthetic)
- A subtle horizontal gradient line (transparent → blue → transparent) as a separator
- Bottom edge: very small text "sergiovillena.dev" in muted gray

VISUAL EFFECTS TO INCORPORATE:
- Glass-morphism / frosted glass: the card surface should have a slight translucent
  quality with backdrop-blur feel, like looking through tinted glass
- A very subtle blue glow or light leak at the edges, as if the card is backlit
- Clean, sharp edges — no rounded corners larger than 8px (cards are usually sharp)
- The overall darkness should be deep (#020617) but not pure black — it's a very dark
  navy with blue undertones

MATERIAL / PRINT FEEL:
- The card should look like it would be printed on matte black or soft-touch dark cardstock
- If showing a 3D mockup, place the card on a dark surface (dark slate or black)
  with subtle blue ambient lighting
- Add a very slight shadow beneath the card for depth
- The mockup should feel premium and tactile

MOOD REFERENCE:
- Think: Stripe developer docs dark theme meets Apple hardware product page
- Think: high-end fintech or developer-tools branding
- NOT: neon, cyberpunk, gaming, or overly futuristic
- NOT: corporate, boring, or template-like

TEXT ON THE CARD:
- Name: "Sergio Villena"
- Title: "Ingeniero Civil en Informática"
- Categories: "Full Stack · IA Aplicada · GIS · Infraestructura"
- Email: "sergio.villena.vergara@gmail.com"
- LinkedIn: "linkedin.com/in/sergio-villena-vergara"
- GitHub: "github.com/SAVillena"
- Website: "sergiovillena.dev"
- Location: "Chile"
```

---

## Prompt Corto (Versión resumida para generación rápida)

```
Premium dark business card for "Sergio Villena", Full Stack Engineer from Chile.
Deep navy-black background (#020617), electric sky blue accent (#0EA5E9),
white bold sans-serif name, small uppercase gray title "Ingeniero Civil en
Informática". Minimal glass-morphism effect, subtle dot-grid pattern on background,
clean geometric layout, Lucide-style thin icons for contact details. Landscape
format, matte dark finish, minimal glow at edges. Think Stripe dark theme meets
premium developer portfolio. Include: email, LinkedIn, GitHub, website.
Ultra-minimalist, no neon, no cyberpunk — sophisticated and understated.
```

---

## Prompt para impresión técnica (si se genera en Figma/Canva manual)

### Especificaciones de diseño

| Propiedad | Valor |
|---|---|
| **Formato** | Landscape (horizontal) |
| **Tamaño estándar** | 90mm × 50mm (3.5" × 2") con 3mm de sangrado |
| **Resolución** | 300 DPI (para impresión) / 150 DPI (para digital) |
| **Modo de color** | CMYK (impresión) / RGB (digital) |
| **Fondo** | `#020617` sólido o con sutiles gradientes |
| **Fuente** | Inter (Google Fonts) — Bold 900 para nombre, Regular/Light para el resto |
| **Bordes** | 0.5px a 1px en `rgba(255,255,255,0.08)` |
| **Corner radius** | 3mm a 5mm (opcional, puede ser recto) |
| **Acabado recomendado** | Mate negro soft-touch con barniz spot UV en el nombre y el ícono |

### Versión para impresión en tarjeta física

- **Fondo:** Negro mate profundo (soft-touch lamination)
- **Nombre:** Barniz UV spot en blanco brillante o hot-stamp plateado
- **Ícono terminal:** Hot-stamp o impresión UV en azul eléctrico
- **Texto secundario:** Impresión en gris claro sobre negro
- **Borde sutil:** Línea fina en gris oscuro o azul muy tenue
- **Código QR (opcional):** Generado con los colores del site, apuntando a `sergiovillena.dev`
