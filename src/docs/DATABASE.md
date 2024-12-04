# Estructura de Base de Datos

## Colecciones Principales

### Users
- id: string
- username: string
- email: string
- balance: number
- inventory: Array<ItemReference>
- trades: Array<TradeReference>
- settings: UserSettings

### Items
- id: string
- name: string
- type: string
- wear: string
- price: number
- rarity: string
- status: 'available' | 'locked' | 'on_sale'

### Trades
- id: string
- sender: UserReference
- receiver: UserReference
- senderItems: Array<ItemReference>
- receiverItems: Array<ItemReference>
- status: 'pending' | 'completed' | 'cancelled'
- timestamp: Date

### Sales
- id: string
- seller: UserReference
- item: ItemReference
- price: number
- status: 'active' | 'sold' | 'cancelled'
- createdAt: Date

## Índices Recomendados
- users.username
- items.type
- items.status
- trades.status
- sales.status

## Consideraciones de Seguridad
- Encriptación de datos sensibles
- Validación de transacciones
- Rate limiting por usuario
- Logs de actividad