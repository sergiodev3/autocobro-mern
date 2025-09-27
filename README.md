# 🛒 AutoCobro MERN - Sistema de Autocobro Inteligente

Un sistema completo de autocobro desarrollado con **MERN Stack** (MongoDB, Express.js, React, Node.js) que permite a los usuarios escanear productos, realizar compras y procesar pagos de forma autónoma.

## 🚀 Características Principales

- **💳 Sistema de Autocobro**: Escaneo de códigos de barras y procesamiento de compras
- **📦 Gestión de Productos**: CRUD completo con imágenes y búsqueda
- **👥 Gestión de Usuarios**: Registro, autenticación y perfiles
- **📊 Dashboard Administrativo**: Estadísticas y control total del sistema
- **🧾 Historial de Transacciones**: Seguimiento completo de ventas
- **📱 Diseño Responsivo**: Optimizado para desktop, tablet y móvil
- **🔍 Búsqueda Inteligente**: Filtros por nombre y código de barras

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** con TypeScript
- **Vite** para desarrollo rápido
- **React Router** para navegación
- **Axios** para peticiones HTTP
- **CSS3** con diseño responsivo

### Backend
- **Node.js** con Express.js
- **MongoDB** con Mongoose
- **CORS** habilitado
- **API RESTful** bien estructurada

## 📋 Prerrequisitos

Asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (v16 o superior)
- [MongoDB](https://www.mongodb.com/) (local o MongoDB Atlas)
- [Git](https://git-scm.com/)

## ⚡ Instalación y Configuración

### 1. Clonar el repositorio
```bash
git clone https://github.com/sergiodev3/autocobro-mern.git
cd autocobro-mern
```

### 2. Configurar Backend
```bash
cd backend
npm install
```

Crear archivo `.env` en la carpeta `backend`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/autocobro-app
# O usar MongoDB Atlas:
# MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/autocobro-app
```

### 3. Configurar Frontend
```bash
cd ../frontend
npm install
```

### 4. Ejecutar la Aplicación

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

La aplicación estará disponible en:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000

## 🔗 Endpoints de la API

### 👥 Usuarios
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/users` | Obtener todos los usuarios |
| GET | `/api/users/:id` | Obtener usuario por ID |
| POST | `/api/users` | Crear nuevo usuario |
| PUT | `/api/users/:id` | Actualizar usuario |
| DELETE | `/api/users/:id` | Eliminar usuario |

### 📦 Productos
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/products` | Obtener todos los productos |
| GET | `/api/products/:id` | Obtener producto por ID |
| GET | `/api/products/price/:barcode` | Buscar producto por código de barras |
| POST | `/api/products` | Crear nuevo producto |
| PUT | `/api/products/:id` | Actualizar producto |
| DELETE | `/api/products/:id` | Eliminar producto |

### 🧾 Transacciones
| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/transactions` | Obtener todas las transacciones |
| GET | `/api/transactions/:id` | Obtener transacción por ID |
| POST | `/api/transactions` | Crear nueva transacción |

## 📊 Estructura del Proyecto

```
autocobro-mern/
├── backend/                 # Servidor Node.js + Express
│   ├── src/
│   │   ├── controllers/     # Lógica de negocio
│   │   ├── models/         # Modelos de MongoDB
│   │   ├── routes/         # Rutas de la API
│   │   ├── middlewares/    # Middlewares personalizados
│   │   └── utils/          # Utilidades y configuración
│   ├── server.js           # Punto de entrada del servidor
│   └── package.json
├── frontend/               # Cliente React + TypeScript
│   ├── src/
│   │   ├── components/     # Componentes de React
│   │   ├── services/       # Servicios API
│   │   ├── types/          # Tipos de TypeScript
│   │   └── config/         # Configuración
│   ├── index.html
│   └── package.json
└── README.md
```

## 🎯 Funcionalidades

### 🛒 Sistema de Autocobro
- Escaneo de códigos de barras (simulado con input)
- Carrito de compras interactivo
- Selección de método de pago (efectivo/tarjeta)
- Generación de tickets de compra

### 📦 Administración de Productos
- Crear, editar y eliminar productos
- Subir imágenes de productos
- Búsqueda por nombre o código
- Vista en tarjetas con información completa

### 👥 Gestión de Usuarios
- Registro de nuevos usuarios
- Autenticación con credenciales
- Lista de usuarios registrados
- Datos almacenados en MongoDB

### 📊 Dashboard
- Resumen de estadísticas
- Contadores de productos, usuarios y transacciones
- Navegación intuitiva entre módulos

## 🔧 Configuración Avanzada

### Variables de Entorno (Backend)
```env
PORT=5000                    # Puerto del servidor
MONGODB_URI=tu_uri_mongodb   # URI de conexión a MongoDB
NODE_ENV=development         # Entorno de ejecución
```

### Configuración API (Frontend)
Editar `frontend/src/config/index.ts`:
```typescript
export const config = {
  API_BASE_URL: 'http://localhost:5000/api',
  DEFAULT_TIMEOUT: 5000,
};
```

## 🚀 Despliegue

### Backend (Heroku/Railway/DigitalOcean)
1. Configurar variables de entorno en producción
2. Usar MongoDB Atlas para la base de datos
3. Configurar CORS para el dominio de frontend

### Frontend (Vercel/Netlify)
1. Actualizar `API_BASE_URL` con la URL de producción
2. Configurar redirects para React Router

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 👨‍💻 Autor

**Sergio Dev** - [@sergiodev3](https://github.com/sergiodev3)

## 🙏 Agradecimientos

- Inspirado en sistemas de autocobro modernos
- Construido con las mejores prácticas de MERN Stack
- Diseño UI/UX centrado en la experiencia del usuario

---

⭐ **¡Si te gusta este proyecto, no olvides darle una estrella!** ⭐