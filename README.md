# MiVoto

Proyecto frontend para MiVoto — una aplicación informativa sobre eventos electorales, candidatos y ubicaciones de votación.

**Demo / Presentación**

- **Enlace de la presentación**: https://democracia-simplificada--b2qqne2.gamma.site/
- **Enlace de despliegue**: https://web.francopm.dev/

**Descripción breve**

MiVoto es una interfaz construida con Next.js y Tailwind CSS que centraliza información electoral: calendarios, noticias, candidatos, partidos y lugares de votación. Está pensada para ser clara, accesible y adaptable a dispositivos móviles.

**Cómo Probar (rápido)**

Recomendado usar `bash` (Git Bash o WSL) en Windows. Desde la raíz del proyecto `voto-claro` ejecuta:

```bash
cd voto-claro
npm install
npm run dev
```

Abrir `http://localhost:3000` en el navegador. Para producción:

```bash
npm run build
npm run start
```

**Características Principales**

- **Calendario electoral**: muestra fechas y fases relevantes.
- **Directorio de candidatos**: fichas con información pública de candidatos por cargo.
- **Noticias**: sección con noticias y fuentes.
- **Mapas y localización**: geolocalización de centros de votación (Mapbox).
- **Soporte para tema oscuro/claro** y accesibilidad móvil.

**Detalles Técnicos**

Esta sección explica las tecnologías clave utilizadas en MiVoto, su propósito y cómo contribuyen al proyecto.

**Tecnologías y Propósitos**

- **Next.js (v16)**: Framework React para aplicaciones web con renderizado del lado del servidor (SSR) y generación estática (SSG). Usado para optimizar el rendimiento, SEO y experiencia de usuario en aplicaciones informativas.
- **React (v19)**: Biblioteca para construir interfaces de usuario. Base para componentes interactivos y estado de la aplicación.
- **Tailwind CSS**: Framework de CSS utilitario para estilos rápidos y consistentes. Permite diseño responsivo y personalizado sin hojas de estilo complejas.
- **GSAP (@gsap/react)**: Librería de animaciones para crear transiciones suaves y atractivas en la UI, mejorando la experiencia visual.
- **Mapbox GL JS**: API para mapas interactivos. Utilizada para geolocalización y visualización de centros de votación con datos precisos.
- **Formik y Yup**: Formik maneja formularios React, Yup valida datos. Usados para formularios de búsqueda, filtros y entradas de usuario con validación robusta.
- **Radix UI**: Conjunto de componentes primitivos accesibles. Base para UI consistente y compatible con estándares de accesibilidad (ARIA).
- **Axios**: Cliente HTTP para solicitudes a APIs. Usado para fetch de datos de noticias, candidatos y otras fuentes externas.
- **Next Themes**: Soporte para temas (oscuro/claro). Mejora la accesibilidad y personalización del usuario.
- **Lucide React**: Iconos SVG. Proporciona iconografía consistente y escalable en la aplicación.
- **TypeScript**: Superset de JavaScript con tipos estáticos. Mejora la mantenibilidad, reduce errores y facilita el desarrollo colaborativo.
- **ESLint**: Linter para JavaScript/TypeScript. Asegura código limpio y consistente siguiendo reglas predefinidas.
- **PostCSS y Tailwind PostCSS**: Procesadores CSS. Integran Tailwind con Next.js para estilos optimizados.

**Estructura del Proyecto**

El proyecto sigue una arquitectura modular basada en Next.js App Router, separando responsabilidades para facilitar el mantenimiento y escalabilidad.

- **`app/`**: Contiene las rutas y páginas de la aplicación usando el App Router de Next.js.
  - `(dashboard)/`: Páginas del dashboard administrativo.
  - `(pages)/`: Páginas públicas adicionales.
  - `(site)/`: Páginas principales del sitio (calendario, candidatos, etc.).
  - `api/`: Endpoints de API para datos dinámicos (noticias, etc.).
  - `globals.css`: Estilos globales.
  - `layout.tsx`: Layout raíz de la aplicación.
- **`components/`**: Componentes reutilizables organizados por funcionalidad.
  - `ui/`: Componentes base (botones, inputs, etc.) usando Radix UI y Tailwind.
  - `home/`, `maps/`, `miembro-mesa/`: Componentes específicos de secciones.
  - `animations/`: Componentes de animaciones con GSAP.
  - `app-sidebar.tsx`, `nav-main.tsx`: Navegación y layout.
- **`core/`**: Lógica de dominio y módulos centrales.
  - `candidates/`: Gestión de datos de candidatos.
  - `locationVote/`: Lógica para ubicaciones de votación.
  - `modules/`, `policyPlan/`, `politicalParty/`: Módulos específicos del dominio electoral.
- **`hooks/`**: Hooks personalizados de React para lógica reutilizable (useNews, useElectoralEvents, etc.).
- **`lib/`**: Utilidades y helpers (utils.ts, mockData.ts).
- **`services/`**: Servicios para interacciones externas (candidatesService.ts, newsService.ts).
- **`public/`**: Archivos estáticos (imágenes, manifest.json para PWA, datos JSON como calendario.json).
- **`assets/`**: Recursos gráficos (SVG de logos, componentes SVG).
- **`presentation/`**: Posiblemente vistas o presentaciones adicionales.
- **`constants/`**, **`types/`** (si existen): Constantes y tipos TypeScript.

Esta estructura promueve la separación de concerns, facilitando pruebas, mantenimiento y colaboración.

**Scripts útiles**

- `npm run dev`: arranca la app en modo desarrollo.
- `npm run build`: compila la app para producción.
- `npm run start`: ejecuta la app compilada.
- `npm run lint`: ejecuta ESLint.

**Despliegue y Demo**

La aplicación puede desplegarse en plataformas como Vercel o Netlify. La presentación/demostración pública está disponible en:

https://democracia-simplificada--b2qqne2.gamma.site/

El despliegue actual de la aplicación está en:

https://web.francopm.dev/

**Contribuir**

1. Haz un fork y crea una rama feature: `git checkout -b feature/tu-cambio`.
2. Implementa tu cambio y añade pruebas si aplica.
3. Abre un Pull Request explicando el cambio.

**Equipo**

- **Sergio Antonio Ariza Rosas** - Ingeniero DevOps
- **Yaren Anderson Melgarejo Cuenca** - Desarrollador Frontend
- **Roberto Alonso Mosquera Perales** - Desarrollador Backend
- **Franco Johan Perez Melgarejo** - Ingeniero de control de calidad (QA)
- **Johann Gudwig Camiloaga Cuenca** - Líder de Proyecto y Estratega

**Propietario del Repositorio**: LIUNKS (GitHub: [LIUNKS](https://github.com/LIUNKS))

**Contacto**

- **GitHub**: [Repositorio MiVoto](https://github.com/LIUNKS/VotaClaro-Frontend)

**Licencia**

- Revisa el archivo `LICENSE` en la raíz del repositorio.

---

Si quieres, puedo:

- Añadir capturas, badges y un título visual.
- Localizar el README a inglés adicionalmente.
- Componer una sección de despliegue detallada para Vercel con variables de entorno.

¿Qué prefieres que haga a continuación?
