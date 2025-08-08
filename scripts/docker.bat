@echo off
setlocal enabledelayedexpansion

REM Script para manejar operaciones de Docker en Windows

if "%1"=="" (
    echo Uso: scripts\docker.bat [comando]
    echo.
    echo Comandos disponibles:
    echo   build     - Construir la imagen Docker
    echo   up        - Levantar servicios en producción
    echo   dev       - Levantar servicios en desarrollo
    echo   down      - Detener todos los servicios
    echo   logs      - Ver logs en tiempo real
    echo   restart   - Reiniciar servicios
    echo   clean     - Limpiar contenedores e imágenes
    echo   help      - Mostrar esta ayuda
    goto :eof
)

if "%1"=="help" (
    echo Uso: scripts\docker.bat [comando]
    echo.
    echo Comandos disponibles:
    echo   build     - Construir la imagen Docker
    echo   up        - Levantar servicios en producción
    echo   dev       - Levantar servicios en desarrollo
    echo   down      - Detener todos los servicios
    echo   logs      - Ver logs en tiempo real
    echo   restart   - Reiniciar servicios
    echo   clean     - Limpiar contenedores e imágenes
    echo   help      - Mostrar esta ayuda
    goto :eof
)

if "%1"=="build" (
    echo 🔨 Construyendo imagen Docker...
    docker build -t prueba-backend .
    echo ✅ Imagen construida exitosamente
    goto :eof
)

if "%1"=="up" (
    echo 🚀 Levantando servicios en producción...
    docker-compose up -d
    echo ✅ Servicios levantados en producción
    echo 📊 Health check: http://localhost:3000/health
    goto :eof
)

if "%1"=="dev" (
    echo 🔧 Levantando servicios en desarrollo...
    docker-compose -f docker-compose.yml -f docker-compose.override.yml up
    goto :eof
)

if "%1"=="down" (
    echo 🛑 Deteniendo servicios...
    docker-compose down
    echo ✅ Servicios detenidos
    goto :eof
)

if "%1"=="logs" (
    echo 📋 Mostrando logs...
    docker-compose logs -f backend
    goto :eof
)

if "%1"=="restart" (
    echo 🔄 Reiniciando servicios...
    docker-compose restart
    echo ✅ Servicios reiniciados
    goto :eof
)

if "%1"=="clean" (
    echo 🧹 Limpiando contenedores e imágenes...
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
    echo ✅ Limpieza completada
    goto :eof
)

echo ❌ Comando no válido: %1
echo.
echo Uso: scripts\docker.bat [comando]
echo.
echo Comandos disponibles:
echo   build     - Construir la imagen Docker
echo   up        - Levantar servicios en producción
echo   dev       - Levantar servicios en desarrollo
echo   down      - Detener todos los servicios
echo   logs      - Ver logs en tiempo real
echo   restart   - Reiniciar servicios
echo   clean     - Limpiar contenedores e imágenes
echo   help      - Mostrar esta ayuda
