import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { DatabaseConnection } from './infrastructure/database/connection';
import authRoutes from './interfaces/routes/authRoutes';
import userRoutes from './interfaces/routes/userRoutes';
import { errorHandler, notFoundHandler } from './interfaces/middleware/errorHandler';

export class App {
  public app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3000');
    
    this.initializeMiddlewares();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  private initializeMiddlewares(): void {
    // Middlewares de seguridad
    this.app.use(helmet());
    this.app.use(cors());
    
    // Middleware de logging
    this.app.use(morgan('combined'));
    
    // Middleware para parsear JSON
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));
  }

  private initializeRoutes(): void {
    // Ruta de health check
    this.app.get('/health', (req, res) => {
      res.status(200).json({
        success: true,
        message: 'Servidor funcionando correctamente',
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    // Rutas de la API
    this.app.use('/api/auth', authRoutes);
    this.app.use('/api/users', userRoutes);
  }

  private initializeErrorHandling(): void {
    // Middleware para rutas no encontradas
    this.app.use('*', notFoundHandler);
    
    // Middleware para manejo de errores
    this.app.use(errorHandler);
  }

  async start(): Promise<void> {
    try {
      // Conectar a la base de datos
      const dbConnection = DatabaseConnection.getInstance();
      await dbConnection.connect();

      // Iniciar el servidor
      this.app.listen(this.port, () => {
        console.log(`🚀 Servidor iniciado en el puerto ${this.port}`);
        console.log(`📊 Ambiente: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 Health check: http://localhost:${this.port}/health`);
        console.log(`📚 API Docs: http://localhost:${this.port}/api`);
      });

    } catch (error) {
      console.error('❌ Error al iniciar el servidor:', error);
      process.exit(1);
    }
  }

  async stop(): Promise<void> {
    try {
      const dbConnection = DatabaseConnection.getInstance();
      await dbConnection.disconnect();
      console.log('🛑 Servidor detenido');
    } catch (error) {
      console.error('❌ Error al detener el servidor:', error);
    }
  }
}
