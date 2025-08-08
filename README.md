# Backend REST con Express y TypeScript

Un backend REST robusto construido con Express.js y TypeScript, siguiendo los principios de Clean Architecture y SOLID.

## 🏗️ Arquitectura

El proyecto sigue Clean Architecture con las siguientes capas:

- **Domain**: Entidades, interfaces de repositorios y servicios
- **Application**: Casos de uso (Use Cases)
- **Infrastructure**: Implementaciones concretas (MongoDB, JWT)
- **Interfaces**: Controladores, rutas y middleware

## 🚀 Características

- ✅ Registro de usuarios con validación
- ✅ Autenticación con JWT
- ✅ Protección de rutas con middleware
- ✅ Validación de datos
- ✅ Manejo de errores centralizado
- ✅ Logging con Morgan
- ✅ Seguridad con Helmet y CORS
- ✅ Conexión a MongoDB Atlas
- ✅ TypeScript con configuración estricta

## 📋 Requisitos

- Node.js (v16 o superior)
- MongoDB Atlas (cluster gratuito)
- npm o yarn

## 🛠️ Instalación

### Opción 1: Instalación Local

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd prueba-backend
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
```

Editar el archivo `.env` con tus credenciales:
```env
# Configuración del servidor
PORT=3000
NODE_ENV=development

# MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Configuración de la aplicación
BCRYPT_ROUNDS=12
```

4. **Compilar TypeScript**
```bash
npm run build
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

6. **Ejecutar en producción**
```bash
npm start
```

### Opción 2: Docker (Recomendado)

#### 🐳 Usando Docker Compose (Más fácil)

1. **Clonar el repositorio**
```bash
git clone <repository-url>
cd prueba-backend
```

2. **Ejecutar en producción**
```bash
docker-compose up -d
```

3. **Ejecutar en desarrollo**
```bash
docker-compose -f docker-compose.yml -f docker-compose.override.yml up
```

4. **Ver logs**
```bash
docker-compose logs -f backend
```

5. **Detener servicios**
```bash
docker-compose down
```

#### 🐳 Usando Docker directamente

1. **Construir la imagen**
```bash
docker build -t prueba-backend .
```

2. **Ejecutar el contenedor**
```bash
docker run -d \
  --name prueba-backend \
  -p 3000:3000 \
  -e MONGODB_URI="mongodb+srv://juan98:I4mD3v3l0p3r**@cluster0.2avrkut.mongodb.net/prueba-backend?retryWrites=true&w=majority" \
  -e JWT_SECRET="mi-super-secreto-jwt-key-para-prueba-tecnica-2024" \
  prueba-backend
```

3. **Ver logs**
```bash
docker logs -f prueba-backend
```

4. **Detener contenedor**
```bash
docker stop prueba-backend
docker rm prueba-backend
```

## 📚 API Endpoints

### Autenticación

#### POST `/api/auth/register`
Registra un nuevo usuario.

**Body:**
```json
{
  "nombre": "Juan Pérez",
  "email": "juan@example.com",
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
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "telefono": "1234567890",
      "edad": 25,
      "createdAt": "2023-09-01T10:00:00.000Z",
      "updatedAt": "2023-09-01T10:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### POST `/api/auth/login`
Autentica un usuario existente.

**Body:**
```json
{
  "email": "juan@example.com",
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
      "id": "64f1a2b3c4d5e6f7g8h9i0j1",
      "nombre": "Juan Pérez",
      "email": "juan@example.com",
      "telefono": "1234567890",
      "edad": 25
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### Usuarios (Protegido)

#### GET `/api/users/profile`
Obtiene el perfil del usuario autenticado.

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
    "id": "64f1a2b3c4d5e6f7g8h9i0j1",
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "telefono": "1234567890",
    "edad": 25,
    "createdAt": "2023-09-01T10:00:00.000Z",
    "updatedAt": "2023-09-01T10:00:00.000Z"
  }
}
```

### Health Check

#### GET `/health`
Verifica el estado del servidor.

**Response:**
```json
{
  "success": true,
  "message": "Servidor funcionando correctamente",
  "timestamp": "2023-09-01T10:00:00.000Z",
  "environment": "development"
}
```

## 🔐 Autenticación

Para acceder a rutas protegidas, incluye el token JWT en el header:

```
Authorization: Bearer <token>
```

## 📁 Estructura del Proyecto

```
src/
├── domain/                 # Capa de dominio
│   ├── entities/          # Entidades del negocio
│   ├── repositories/      # Interfaces de repositorios
│   └── services/          # Interfaces de servicios
├── application/           # Capa de aplicación
│   └── use-cases/        # Casos de uso
├── infrastructure/        # Capa de infraestructura
│   ├── database/         # Configuración de BD
│   ├── repositories/     # Implementaciones de repositorios
│   └── services/         # Implementaciones de servicios
└── interfaces/           # Capa de interfaces
    ├── controllers/      # Controladores
    ├── middleware/       # Middleware
    └── routes/          # Rutas
```

## 🧪 Validaciones

- **Nombre**: Mínimo 2 caracteres
- **Email**: Formato válido y único
- **Contraseña**: Mínimo 6 caracteres
- **Teléfono**: Mínimo 8 dígitos
- **Edad**: Entre 1 y 120 años

## 🔒 Seguridad

- Contraseñas hasheadas con bcrypt
- Tokens JWT para autenticación
- Headers de seguridad con Helmet
- CORS configurado
- Validación de entrada
- Manejo seguro de errores

## 🚀 Scripts Disponibles

### Scripts NPM
- `npm run dev`: Ejecuta en modo desarrollo con hot reload
- `npm run build`: Compila TypeScript
- `npm start`: Ejecuta en modo producción
- `npm test`: Ejecuta tests (pendiente)

### Scripts Docker
- `docker-compose up -d`: Ejecuta en producción
- `docker-compose up`: Ejecuta en desarrollo
- `docker-compose down`: Detiene todos los servicios
- `docker-compose logs -f backend`: Ver logs en tiempo real
- `docker build -t prueba-backend .`: Construir imagen
- `docker run -p 3000:3000 prueba-backend`: Ejecutar contenedor

### Scripts de Conveniencia
**Linux/Mac:**
```bash
chmod +x scripts/docker.sh
./scripts/docker.sh build    # Construir imagen
./scripts/docker.sh up       # Levantar en producción
./scripts/docker.sh dev      # Levantar en desarrollo
./scripts/docker.sh down     # Detener servicios
./scripts/docker.sh logs     # Ver logs
./scripts/docker.sh clean    # Limpiar todo
```

**Windows:**
```cmd
scripts\docker.bat build     # Construir imagen
scripts\docker.bat up        # Levantar en producción
scripts\docker.bat dev       # Levantar en desarrollo
scripts\docker.bat down      # Detener servicios
scripts\docker.bat logs      # Ver logs
scripts\docker.bat clean     # Limpiar todo
```

## 📝 Notas de Desarrollo

- El proyecto usa TypeScript con configuración estricta
- Sigue principios SOLID y Clean Architecture
- Implementa patrón Repository para acceso a datos
- Usa inyección de dependencias
- Manejo centralizado de errores
- Logging estructurado

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

