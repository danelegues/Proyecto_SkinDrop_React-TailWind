# Documentación SkinDrop

## Descripción General
SkinDrop es una plataforma de compra-venta de skins de CS2, inspirada en sitios como CSGOEmpire. 
El proyecto está dividido en dos fases:
1. Frontend (Actual): Desarrollo de la interfaz y experiencia de usuario
2. Backend (Futuro): Implementación de la lógica de servidor y base de datos

## Estructura del Proyecto

src/
├── components/                # Componentes globales reutilizables
│   ├── Header/               # Navegación principal + autenticación
│   │   └── index.jsx         # Menú, logo, botones de usuario
│   └── Footer/               # Pie de página global
├── Pestañas/                 # Páginas principales
│   ├── Landing/              # Página de inicio
│   │   ├── components/       # Componentes específicos de landing
│   │   └── styles/          # Estilos de landing
│   └── Tienda/              # Página de tienda
│       ├── components/       # Componentes de tienda
│       ├── hooks/           # Lógica de filtrado y búsqueda
│       └── styles/          # Estilos de tienda
└── assets/                   # Recursos estáticos
    └── images/              # Imágenes del sitio

## Estado Actual (v1.0)

### Frontend
- **Framework**: React 18 + Vite
- **Estilos**: TailwindCSS para diseño responsive
- **Rutas**: React Router v6
- **Estado**: Local (sin persistencia)

### Almacenamiento Actual
- Imágenes: `/public/img/`
- Datos mockup: archivos .js locales
- Sin base de datos actual

## Cambios Futuros Planificados

### Backend (Laravel + PHP)
- Implementar API RESTful
- Gestión de usuarios y autenticación
- Sistema de pagos
- Gestión de inventario en tiempo real

### Componentes a Modificar
1. **Header**
   - Añadir estado de autenticación
   - Implementar carrito de compras

2. **Tienda**
   - Conectar con API para obtener skins
   - Implementar sistema de filtrado en backend
   - Añadir paginación servidor-lado

## Notas de Desarrollo
- Las rutas de imágenes actuales son temporales
- Los datos de skins son mockup y se reemplazarán
- La autenticación será necesaria para pujar/comprar

