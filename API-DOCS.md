# 📚 Documentación de la API - AutoCobro MERN

## 🔗 URL Base
```
http://localhost:5000/api
```

## 📝 Ejemplos de Uso

### 👥 Usuarios

#### Crear Usuario
```bash
POST /api/users
Content-Type: application/json

{
  "name": "Juan Pérez",
  "email": "juan@email.com",
  "password": "123456"
}
```

#### Obtener Todos los Usuarios
```bash
GET /api/users
```

**Respuesta:**
```json
[
  {
    "_id": "64f123456789abcdef012345",
    "name": "Juan Pérez", 
    "email": "juan@email.com",
    "cashback": 0,
    "createdAt": "2024-09-01T10:00:00.000Z",
    "updatedAt": "2024-09-01T10:00:00.000Z"
  }
]
```

### 📦 Productos

#### Crear Producto
```bash
POST /api/products
Content-Type: application/json

{
  "name": "Coca Cola 600ml",
  "price": 25.50,
  "description": "Refresco de cola",
  "barcode": "7501234567890",
  "image": "https://example.com/coca-cola.jpg"
}
```

#### Buscar Producto por Código de Barras
```bash
GET /api/products/price/7501234567890
```

**Respuesta:**
```json
{
  "_id": "64f123456789abcdef012346",
  "name": "Coca Cola 600ml",
  "price": 25.50,
  "description": "Refresco de cola",
  "barcode": "7501234567890",
  "image": "https://example.com/coca-cola.jpg",
  "createdAt": "2024-09-01T10:30:00.000Z"
}
```

#### Actualizar Producto
```bash
PUT /api/products/64f123456789abcdef012346
Content-Type: application/json

{
  "name": "Coca Cola 600ml - Oferta",
  "price": 22.00
}
```

#### Eliminar Producto
```bash
DELETE /api/products/64f123456789abcdef012346
```

### 🧾 Transacciones

#### Crear Transacción (Compra)
```bash
POST /api/transactions
Content-Type: application/json

{
  "userId": "64f123456789abcdef012345",
  "products": [
    {
      "productId": "64f123456789abcdef012346",
      "quantity": 2,
      "price": 25.50
    },
    {
      "productId": "64f123456789abcdef012347", 
      "quantity": 1,
      "price": 15.00
    }
  ],
  "total": 66.00,
  "paymentMethod": "Tarjeta"
}
```

#### Obtener Todas las Transacciones
```bash
GET /api/transactions
```

**Respuesta:**
```json
[
  {
    "_id": "64f123456789abcdef012348",
    "userId": "64f123456789abcdef012345",
    "products": [
      {
        "productId": "64f123456789abcdef012346",
        "quantity": 2,
        "price": 25.50
      }
    ],
    "total": 51.00,
    "paymentMethod": "Tarjeta",
    "createdAt": "2024-09-01T11:00:00.000Z"
  }
]
```

## 🚨 Códigos de Error

| Código | Descripción |
|--------|-------------|
| 200 | OK - Solicitud exitosa |
| 201 | Created - Recurso creado exitosamente |
| 400 | Bad Request - Error en los datos enviados |
| 404 | Not Found - Recurso no encontrado |
| 500 | Internal Server Error - Error del servidor |

## 🧪 Probar la API

### Con curl:
```bash
# Obtener productos
curl -X GET http://localhost:5000/api/products

# Crear usuario
curl -X POST http://localhost:5000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@email.com","password":"123456"}'
```

### Con Postman:
1. Importa la colección desde el archivo `api-examples.json`
2. Configura la variable de entorno `baseUrl` como `http://localhost:5000/api`
3. Ejecuta las peticiones de ejemplo