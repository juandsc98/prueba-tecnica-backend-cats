import { Request, Response } from 'express';
import { RegisterUserUseCase } from '../../application/use-cases/auth/RegisterUserUseCase';
import { LoginUserUseCase } from '../../application/use-cases/auth/LoginUserUseCase';
import { MongoUserRepository } from '../../infrastructure/repositories/MongoUserRepository';
import { JwtAuthService } from '../../infrastructure/services/JwtAuthService';

export class AuthController {
  private registerUserUseCase: RegisterUserUseCase;
  private loginUserUseCase: LoginUserUseCase;

  constructor() {
    const userRepository = new MongoUserRepository();
    const authService = new JwtAuthService();
    
    this.registerUserUseCase = new RegisterUserUseCase(userRepository, authService);
    this.loginUserUseCase = new LoginUserUseCase(userRepository, authService);
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { nombre, email, password, telefono, edad } = req.body;

      const result = await this.registerUserUseCase.execute({
        nombre,
        email,
        password,
        telefono,
        edad
      });

      res.status(201).json({
        success: true,
        message: 'Usuario registrado exitosamente',
        data: result
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error al registrar usuario'
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const result = await this.loginUserUseCase.execute({
        email,
        password
      });

      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        data: result
      });
    } catch (error) {
      res.status(401).json({
        success: false,
        message: error instanceof Error ? error.message : 'Credenciales inválidas'
      });
    }
  }
}
