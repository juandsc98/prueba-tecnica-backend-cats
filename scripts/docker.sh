#!/bin/bash

# Script para manejar operaciones de Docker

set -e

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para mostrar ayuda
show_help() {
    echo -e "${BLUE}Script de Docker para Prueba Backend${NC}"
    echo ""
    echo "Uso: ./scripts/docker.sh [comando]"
    echo ""
    echo "Comandos disponibles:"
    echo "  build     - Construir la imagen Docker"
    echo "  up        - Levantar servicios en producción"
    echo "  dev       - Levantar servicios en desarrollo"
    echo "  down      - Detener todos los servicios"
    echo "  logs      - Ver logs en tiempo real"
    echo "  restart   - Reiniciar servicios"
    echo "  clean     - Limpiar contenedores e imágenes"
    echo "  help      - Mostrar esta ayuda"
    echo ""
}

# Función para construir imagen
build() {
    echo -e "${YELLOW}🔨 Construyendo imagen Docker...${NC}"
    docker build -t prueba-backend .
    echo -e "${GREEN}✅ Imagen construida exitosamente${NC}"
}

# Función para levantar en producción
up() {
    echo -e "${YELLOW}🚀 Levantando servicios en producción...${NC}"
    docker-compose up -d
    echo -e "${GREEN}✅ Servicios levantados en producción${NC}"
    echo -e "${BLUE}📊 Health check: http://localhost:3000/health${NC}"
}

# Función para levantar en desarrollo
dev() {
    echo -e "${YELLOW}🔧 Levantando servicios en desarrollo...${NC}"
    docker-compose -f docker-compose.yml -f docker-compose.override.yml up
}

# Función para detener servicios
down() {
    echo -e "${YELLOW}🛑 Deteniendo servicios...${NC}"
    docker-compose down
    echo -e "${GREEN}✅ Servicios detenidos${NC}"
}

# Función para ver logs
logs() {
    echo -e "${YELLOW}📋 Mostrando logs...${NC}"
    docker-compose logs -f backend
}

# Función para reiniciar
restart() {
    echo -e "${YELLOW}🔄 Reiniciando servicios...${NC}"
    docker-compose restart
    echo -e "${GREEN}✅ Servicios reiniciados${NC}"
}

# Función para limpiar
clean() {
    echo -e "${YELLOW}🧹 Limpiando contenedores e imágenes...${NC}"
    docker-compose down --rmi all --volumes --remove-orphans
    docker system prune -f
    echo -e "${GREEN}✅ Limpieza completada${NC}"
}

# Verificar que Docker esté instalado
check_docker() {
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker no está instalado${NC}"
        exit 1
    fi
    
    if ! command -v docker-compose &> /dev/null; then
        echo -e "${RED}❌ Docker Compose no está instalado${NC}"
        exit 1
    fi
}

# Función principal
main() {
    check_docker
    
    case "$1" in
        build)
            build
            ;;
        up)
            up
            ;;
        dev)
            dev
            ;;
        down)
            down
            ;;
        logs)
            logs
            ;;
        restart)
            restart
            ;;
        clean)
            clean
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            echo -e "${RED}❌ Comando no válido: $1${NC}"
            echo ""
            show_help
            exit 1
            ;;
    esac
}

# Ejecutar función principal
main "$@"
