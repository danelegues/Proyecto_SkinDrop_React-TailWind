# Documentación de Componentes

## ShopNav
**Ubicación**: `src/Pestañas/Tienda/components/ShopNav/index.jsx`

### Propósito
Barra de navegación interna que permite cambiar entre diferentes secciones de la tienda.

### Props
- `currentTab`: String - Tab actual ('market', 'skindrop', 'sales')
- `onTabChange`: Function - Manejador para cambios de tab

### Funcionalidades
- Navegación entre secciones
- Indicador visual de sección activa
- Diseño responsivo
- Iconos personalizados por sección

## SearchBar
**Ubicación**: `src/Pestañas/Tienda/components/SearchBar/index.jsx`

### Propósito
Barra de búsqueda y filtros para la tienda.

### Props
- `searchQuery`: String - Texto de búsqueda
- `onSearchChange`: Function - Manejador de cambios en la búsqueda
- `sortByPrice`: Boolean - Estado de ordenamiento
- `onSortToggle`: Function - Toggle de ordenamiento
- `minPrice/maxPrice`: Number - Rango de precios
- `onMinPriceChange/onMaxPriceChange`: Function - Manejadores de cambio de precio

### Funcionalidades
- Búsqueda por texto
- Ordenamiento por precio
- Filtros de rango de precio
- Diseño responsivo

## YourSales
**Ubicación**: `src/Pestañas/Tienda/components/YourSales/index.jsx`

### Propósito
Gestión de ventas del usuario.

### Componentes Internos
- Lista de ventas activas
- Botón de nueva venta
- Modal de creación de venta

### Funcionalidades
- Visualización de ventas activas
- Creación de nuevas ventas
- Eliminación de ventas
- Gestión de estado local




# Documentación de Hooks

## useShopNavigation
**Ubicación**: `src/Pestañas/Tienda/hooks/useShopNavigation.js`

### Propósito
Maneja la navegación entre las diferentes secciones de la tienda.

### Estado
javascript
const [currentTab, setCurrentTab] = useState('market');

### Retorno
- `currentTab`: String - Tab actual
- `setCurrentTab`: Function - Función para cambiar de tab

### Uso
javascript
const { currentTab, setCurrentTab } = useShopNavigation();


## useSkinsFilter
**Ubicación**: `src/Pestañas/Tienda/hooks/useSkinsFilter.js`

### Propósito
Maneja toda la lógica de filtrado y búsqueda de skins.

### Estado
javascript
const [searchQuery, setSearchQuery] = useState('');
const [sortByPrice, setSortByPrice] = useState(false);
const [typeFilter, setTypeFilter] = useState('all');
const [rarityFilter, setRarityFilter] = useState('all');
const [minPrice, setMinPrice] = useState(0);
const [maxPrice, setMaxPrice] = useState(Infinity);


### Retorno
- Estados y setters para cada filtro
- `filteredSkins`: Array - Lista filtrada de skins

### Uso
javascript
const {
searchQuery,
setSearchQuery,
sortByPrice,
setSortByPrice,
// ... otros estados
filteredSkins
} = useSkinsFilter();
