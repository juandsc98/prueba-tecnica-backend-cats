# Backend REST con Express y TypeScript

Un backend REST robusto construido con Express.js y TypeScript, siguiendo los principios SOLID y Clean Architecture. Incluye autenticación JWT, base de datos MongoDB Atlas, y está completamente dockerizado.

## 🏗️ Arquitectura

Este proyecto implementa **Clean Architecture** con las siguientes capas:

- **Domain**: Entidades y reglas de negocio
- **Application**: Casos de uso y lógica de aplicación
- **Infrastructure**: Implementaciones concretas (MongoDB, JWT)
- **Interfaces**: Controladores, rutas y middleware

## ✨ Características

- ✅ **Autenticación JWT** con bcryptjs
- ✅ **Base de datos MongoDB Atlas** con Mongoose
- ✅ **Validación de datos** robusta
- ✅ **Manejo de errores** centralizado
- ✅ **Logging** con Morgan
- ✅ **Seguridad** con Helmet y CORS
- ✅ **Dockerización completa** con Node.js 22
- ✅ **Health checks** y monitoreo
- ✅ **TypeScript** con configuración estricta

## 📋 Requisitos

- Node.js 18+ o Docker
- MongoDB Atlas (cluster gratuito)
- **Variables de entorno** (se envían por correo)

## 🚀 Instalación Local

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd prueba-backend
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto con las siguientes variables (se envían por correo):

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/database
JWT_SECRET=tu-super-secreto-jwt-key
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12
```

### 4. Ejecutar en desarrollo
```bash
npm run dev
```

### 5. Compilar para producción
```bash
npm run build
npm start
```

## 🐳 Dockerización

El proyecto está completamente dockerizado con **Node.js 22** y utiliza un **multi-stage build** para optimizar el tamaño de la imagen.

### Docker Compose (Recomendado)

#### Producción
```bash
# Construir y ejecutar en producción
docker-compose up -d

# Ver logs
docker-compose logs -f backend

# Detener servicios
docker-compose down
```

#### Desarrollo
```bash
# Ejecutar en modo desarrollo con hot-reload
docker-compose --profile dev up -d

# Ver logs del desarrollo
docker-compose logs -f backend-dev
```

### Docker Directo

#### Construir imagen
```bash
docker build -t prueba-backend .
```

#### Ejecutar contenedor
```bash
# Producción
docker run -d \
  --name prueba-backend \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/database \
  -e JWT_SECRET=tu-super-secreto-jwt-key \
  prueba-backend

# Desarrollo
docker run -d \
  --name prueba-backend-dev \
  -p 3001:3000 \
  -v $(pwd)/src:/app/src \
  -e NODE_ENV=development \
  -e MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/database \
  -e JWT_SECRET=tu-super-secreto-jwt-key \
  prueba-backend npm run dev
```

### Scripts de Conveniencia

#### Linux/Mac
```bash
# Dar permisos de ejecución
chmod +x scripts/docker.sh

# Usar el script
./scripts/docker.sh build    # Construir imagen
./scripts/docker.sh up       # Ejecutar producción
./scripts/docker.sh dev      # Ejecutar desarrollo
./scripts/docker.sh logs     # Ver logs
./scripts/docker.sh down     # Detener servicios
```

#### Windows
```cmd
# Usar el script
scripts\docker.bat build     # Construir imagen
scripts\docker.bat up        # Ejecutar producción
scripts\docker.bat dev       # Ejecutar desarrollo
scripts\docker.bat logs      # Ver logs
scripts\docker.bat down      # Detener servicios
```

## 📡 Endpoints de la API

### Autenticación

#### POST `/api/auth/register`
Registrar un nuevo usuario.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "password": "123456",
  "telefono": "1234567890",
  "edad": 25
}
```

**Response:**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "telefono": "1234567890",
      "edad": 25,
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST `/api/auth/login`
Iniciar sesión.

**Body:**
```json
{
  "email": "juan@ejemplo.com",
  "password": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login exitoso",
  "data": {
    "user": {
      "id": "64f8a1b2c3d4e5f6a7b8c9d0",
      "nombre": "Juan Pérez",
      "email": "juan@ejemplo.com",
      "telefono": "1234567890",
      "edad": 25
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Usuarios (Protegido)

#### GET `/api/users/profile`
Obtener perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "message": "Perfil obtenido exitosamente",
  "data": {
    "id": "64f8a1b2c3d4e5f6a7b8c9d0",
    "nombre": "Juan Pérez",
    "email": "juan@ejemplo.com",
    "telefono": "1234567890",
    "edad": 25,
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Health Check

#### GET `/health`
Verificar el estado del servidor.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 123.456,
  "environment": "production"
}
```

## 🔐 Autenticación

El sistema utiliza **JWT (JSON Web Tokens)** para la autenticación:

1. **Registro**: El usuario se registra y recibe un token JWT
2. **Login**: El usuario inicia sesión y recibe un token JWT
3. **Acceso protegido**: Incluir el token en el header `Authorization: Bearer <token>`

### Estructura del Token
```json
{
  "userId": "64f8a1b2c3d4e5f6a7b8c9d0",
  "email": "juan@ejemplo.com",
  "iat": 1705312200,
  "exp": 1705398600
}
```

## 📁 Estructura del Proyecto

```
src/
├── domain/                 # Capa de dominio
│   ├── entities/          # Entidades de negocio
│   ├── repositories/      # Interfaces de repositorios
│   └── services/          # Interfaces de servicios
├── application/           # Capa de aplicación
│   └── use-cases/        # Casos de uso
│       ├── auth/         # Casos de uso de autenticación
│       └── user/         # Casos de uso de usuarios
├── infrastructure/        # Capa de infraestructura
│   ├── database/         # Configuración de base de datos
│   ├── repositories/     # Implementaciones de repositorios
│   └── services/         # Implementaciones de servicios
└── interfaces/           # Capa de interfaces
    ├── controllers/      # Controladores HTTP
    ├── middleware/       # Middleware personalizado
    └── routes/          # Definición de rutas
```

## ✅ Validaciones

### Usuario
- **Nombre**: Mínimo 2 caracteres
- **Email**: Formato válido y único
- **Contraseña**: Mínimo 6 caracteres
- **Teléfono**: Mínimo 8 dígitos
- **Edad**: Entre 1 y 120 años

### Base de Datos
- **Índices únicos** en email
- **Validaciones de esquema** con Mongoose
- **Timestamps** automáticos (createdAt, updatedAt)

## 🔒 Seguridad

- **Helmet**: Headers de seguridad HTTP
- **CORS**: Configuración de origen cruzado
- **bcryptjs**: Hashing seguro de contraseñas
- **JWT**: Tokens seguros con expiración
- **Validación**: Sanitización de datos de entrada
- **Usuario no-root**: Contenedor Docker ejecutado como usuario no privilegiado

## 📝 Scripts Disponibles

```bash
npm run dev          # Desarrollo con hot-reload
npm run build        # Compilar TypeScript
npm start            # Ejecutar en producción
npm run test         # Ejecutar tests (futuro)
npm run lint         # Linting (futuro)
```

## 🐳 Configuración Docker

### Dockerfile
- **Multi-stage build** para optimizar tamaño
- **Node.js 22 Alpine** para seguridad y rendimiento
- **Usuario no-root** para seguridad
- **Health checks** integrados

### Docker Compose
- **Servicio de producción** con optimizaciones
- **Servicio de desarrollo** con hot-reload
- **Variables de entorno** configurables
- **Volúmenes** para desarrollo

## 📊 Monitoreo

- **Health checks** automáticos
- **Logs estructurados** con timestamps
- **Métricas de rendimiento** (uptime, memoria)
- **Estado de conexión** a MongoDB

## 🔧 Variables de Entorno

**Nota**: Las variables de entorno completas se envían por correo electrónico.

```env
# Servidor
PORT=3000
NODE_ENV=development|production

# Base de datos
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/database

# JWT
JWT_SECRET=tu-super-secreto-jwt-key
JWT_EXPIRES_IN=24h

# Seguridad
BCRYPT_ROUNDS=12
```

## 🚀 Despliegue

### Local con Docker
```bash
# Producción
docker-compose up -d

# Desarrollo
docker-compose --profile dev up -d
```

### Cloud (AWS, GCP, Azure)
1. Construir imagen Docker
2. Subir a registro de contenedores
3. Desplegar en servicio de contenedores
4. Configurar variables de entorno
5. Configurar balanceador de carga

## 📞 Soporte

Para cualquier consulta sobre las variables de entorno o configuración, revisar el correo electrónico enviado con los detalles completos del proyecto.

---

**Desarrollado con ❤️ siguiendo Clean Architecture y principios SOLID**

