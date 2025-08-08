import dotenv from 'dotenv';
import { App } from './app';

// Cargar variables de entorno
dotenv.config();

// Crear e iniciar la aplicación
const app = new App();

// Manejar señales de terminación
process.on('SIGTERM', async () => {
  console.log('🛑 Recibida señal SIGTERM, cerrando servidor...');
  await app.stop();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 Recibida señal SIGINT, cerrando servidor...');
  await app.stop();
  process.exit(0);
});

// Iniciar el servidor
app.start().catch((error) => {
  console.error('❌ Error fatal al iniciar la aplicación:', error);
  process.exit(1);
});
