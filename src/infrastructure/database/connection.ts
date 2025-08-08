import mongoose from 'mongoose';

export class DatabaseConnection {
  private static instance: DatabaseConnection;
  private isConnected = false;

  private constructor() {}

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('Ya conectado a MongoDB');
      return;
    }

    try {
      const mongoUri = process.env.MONGODB_URI;
      
      if (!mongoUri) {
        throw new Error('MONGODB_URI no está definida en las variables de entorno');
      }

      await mongoose.connect(mongoUri);
      
      this.isConnected = true;
      console.log('✅ Conectado exitosamente a MongoDB Atlas');
      
      // Manejar eventos de conexión
      mongoose.connection.on('error', (error) => {
        console.error('❌ Error de conexión a MongoDB:', error);
        this.isConnected = false;
      });

      mongoose.connection.on('disconnected', () => {
        console.log('🔌 Desconectado de MongoDB');
        this.isConnected = false;
      });

      // Manejar cierre graceful
      process.on('SIGINT', async () => {
        await this.disconnect();
        process.exit(0);
      });

    } catch (error) {
      console.error('❌ Error al conectar a MongoDB:', error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    if (!this.isConnected) {
      return;
    }

    try {
      await mongoose.connection.close();
      this.isConnected = false;
      console.log('🔌 Desconectado de MongoDB');
    } catch (error) {
      console.error('❌ Error al desconectar de MongoDB:', error);
      throw error;
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }
}
