# Estructura del Proyecto SkinDrop

## Organización de Carpetas
src/
├── components/                 # Componentes compartidos
│   ├── home/                  # Componentes de la página principal
│   ├── layout/                # Componentes de estructura básica
│   └── shared/                # Componentes reutilizables
├── Pestañas/                  # Módulos principales de la aplicación
│   ├── Intercambio/          # Módulo de intercambio de skins
│   ├── Inventario/           # Módulo de inventario personal
│   ├── Perfil/               # Módulo de perfil de usuario
│   └── Tienda/               # Módulo de tienda
├── docs/                      # Documentación del proyecto
├── styles/                    # Estilos globales
└── App.jsx                    # Componente raíz

## Patrones de Diseño
- Arquitectura modular por características
- Componentes presentacionales y contenedores
- Custom hooks para lógica reutilizable
- Constantes centralizadas por módulo

## Convenciones
- Nombres de carpetas en español
- Componentes en PascalCase
- Hooks con prefijo 'use'
- Archivos de estilos con extensión .css
- Índices para exportación limpia

## Estructura de Módulos
Cada módulo (Pestaña) sigue una estructura consistente:
- components/     # Componentes específicos del módulo
- constants/      # Datos estáticos y configuración
- hooks/          # Lógica de negocio reutilizable
- styles/         # Estilos específicos del módulo