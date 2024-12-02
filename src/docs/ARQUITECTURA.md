# Estructura del Proyecto SkinDrop

## Organización de Carpetas
src/
├── App/
│ └── index.jsx # Componente principal de la aplicación
├── Pestañas/ # Carpeta principal para las diferentes secciones
│ └── Tienda/ # Sección de la tienda
│ ├── components/ # Componentes específicos de la tienda
│ │ ├── SearchBar/ # Barra de búsqueda y filtros
│ │ ├── ShopNav/ # Navegación interna de la tienda
│ │ ├── ProductGrid/ # Grid de productos/skins
│ │ ├── Pagination/ # Paginación
│ │ └── YourSales/ # Componentes para la sección de ventas
│ ├── hooks/ # Hooks personalizados
│ ├── styles/ # Estilos específicos
│ └── index.jsx # Componente principal de la tienda

## Descripción General

- La aplicación está organizada en "Pestañas" principales
- Cada pestaña tiene su propia estructura de componentes
- Los componentes reutilizables se mantienen en carpetas específicas
- Los hooks personalizados manejan la lógica de negocio
- Los estilos están separados en archivos CSS específicos









# Arquitectura del Proyecto SkinDrop

## Componentes que requieren Backend

### 1. SearchBar (src/Pestañas/Tienda/components/SearchBar/index.jsx)
**Mover al backend:**
- Lógica de filtrado y búsqueda
- Ordenamiento de resultados
- Validación de rangos de precios

**¿Por qué?**
- Mejor rendimiento al filtrar directamente en la base de datos
- Paginación más eficiente
- Evita cargar datos innecesarios al cliente

### 2. YourSales (src/Pestañas/Tienda/components/YourSales/index.jsx)
**Mover al backend:**
- Validación de propiedad de skins
- Estado de las ventas (activo, vendido)
- Cálculo de tiempos de listado
- Historial de ventas

**¿Por qué?**
- Seguridad en la validación de propiedad
- Consistencia en el estado de las ventas
- Precisión en los cálculos de tiempo
- Protección de datos sensibles

### 3. NewSaleModal (src/Pestañas/Tienda/components/YourSales/NewSaleModal.jsx)
**Mover al backend:**
- Validación de disponibilidad del skin
- Verificación de precio válido
- Comprobación de duplicados
- Creación de la venta

**¿Por qué?**
- Prevenir ventas duplicadas
- Asegurar precios válidos
- Verificar propiedad del skin
- Mantener consistencia en los datos

### 4. ShopNav (src/Pestañas/Tienda/components/ShopNav/index.jsx)
**Mover al backend:**
- Conteo de ventas activas
- Estado de notificaciones
- Verificación de permisos

**¿Por qué?**
- Precisión en los contadores
- Seguridad en los permisos
- Consistencia en las notificaciones

## Estructura de Backend Necesaria

### Base de Datos
- Tabla de usuarios
- Tabla de skins
- Tabla de ventas
- Tabla de transacciones
- Tabla de notificaciones

### APIs Necesarias
- Gestión de usuarios y autenticación
- CRUD de ventas
- Sistema de búsqueda y filtrado
- Gestión de transacciones
- Sistema de notificaciones

### Consideraciones de Seguridad
- Autenticación de usuarios
- Validación de propiedad de skins
- Protección contra manipulación de precios
- Control de acceso a operaciones sensibles
- Prevención de ventas duplicadas

## Mantenimiento en Frontend

El frontend debe mantener:
1. Interfaz de usuario y estilos
2. Estados locales de UI (modales, tooltips)
3. Validaciones básicas de formularios
4. Mensajes de feedback al usuario
5. Gestión de errores de API

## Plan de Migración Sugerido
1. Implementar sistema de autenticación
2. Crear APIs básicas de CRUD
3. Migrar lógica de filtrado
4. Implementar validaciones de backend
5. Añadir sistema de notificaciones
6. Implementar transacciones seguras
