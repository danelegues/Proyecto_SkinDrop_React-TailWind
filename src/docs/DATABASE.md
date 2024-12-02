# Estructura de Base de Datos Futura

## Tablas Principales

### Users (Usuarios)
sql
CREATE TABLE users (
id BIGINT PRIMARY KEY,
username VARCHAR(255) UNIQUE, -- Nombre único del usuario
email VARCHAR(255) UNIQUE, -- Email para autenticación
password VARCHAR(255), -- Hash de contraseña
balance DECIMAL(10,2), -- Saldo disponible
avatar_url VARCHAR(255), -- Foto de perfil
created_at TIMESTAMP,
updated_at TIMESTAMP
);





### Skins (Productos)
sql
CREATE TABLE skins (
id BIGINT PRIMARY KEY,
name VARCHAR(255), -- Nombre del skin
weapon_type VARCHAR(50), -- Tipo de arma
rarity VARCHAR(50), -- Común, Raro, Legendario, etc.
wear_value FLOAT, -- Desgaste (0.0 - 1.0)
base_price DECIMAL(10,2), -- Precio base
current_price DECIMAL(10,2), -- Precio actual
image_url VARCHAR(255), -- URL de la imagen
in_stock BOOLEAN, -- Disponibilidad
created_at TIMESTAMP,
updated_at TIMESTAMP
);





### Transactions (Transacciones)
sql
CREATE TABLE transactions (
id BIGINT PRIMARY KEY,
user_id BIGINT, -- Comprador/Vendedor
skin_id BIGINT, -- Skin involucrada
type ENUM('buy','sell','bid'), -- Tipo de transacción
amount DECIMAL(10,2), -- Monto
status VARCHAR(50), -- Pendiente, Completada, etc.
created_at TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (skin_id) REFERENCES skins(id)
);







### Inventory (Inventario)
sql
CREATE TABLE inventory (
id BIGINT PRIMARY KEY,
user_id BIGINT, -- Propietario
skin_id BIGINT, -- Skin en inventario
acquired_price DECIMAL(10,2), -- Precio de adquisición
acquired_date TIMESTAMP, -- Fecha de adquisición
status VARCHAR(50), -- Disponible, En venta, Bloqueado
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (skin_id) REFERENCES skins(id)
);






### Bids (Pujas)
sql
CREATE TABLE bids (
id BIGINT PRIMARY KEY,
user_id BIGINT, -- Usuario que puja
skin_id BIGINT, -- Skin objetivo
amount DECIMAL(10,2), -- Cantidad de la puja
status VARCHAR(50), -- Activa, Ganada, Perdida
created_at TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (skin_id) REFERENCES skins(id)
);














## Notas Importantes
- Se usará MySQL como base de datos principal
- Las imágenes se almacenarán en AWS S3
- Se implementará caché con Redis para:
  - Precios en tiempo real
  - Sesiones de usuario
  - Datos frecuentemente accedidos
- Cada transacción mantendrá un registro inmutable
- Se implementará un sistema de respaldo diario
- Las contraseñas se almacenarán con hash bcrypt
- Se mantendrá un log de todas las transacciones para auditoría

## Consideraciones de Seguridad
- Implementar índices para optimizar búsquedas frecuentes
- Usar transacciones para operaciones críticas
- Establecer límites de conexiones por usuario
- Implementar sistema de roles y permisos
- Mantener backups incrementales

## Escalabilidad
- Diseñado para soportar millones de registros
- Preparado para sharding si es necesario
- Optimizado para lecturas frecuentes
- Estructura preparada para análisis de datos