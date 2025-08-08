import { Response } from 'express';
import { GetUserProfileUseCase } from '@/application/use-cases/user/GetUserProfileUseCase';
import { MongoUserRepository } from '@/infrastructure/repositories/MongoUserRepository';
import { AuthenticatedRequest } from '../middleware/authMiddleware';

export class UserController {
  private getUserProfileUseCase: GetUserProfileUseCase;

  constructor() {
    const userRepository = new MongoUserRepository();
    this.getUserProfileUseCase = new GetUserProfileUseCase(userRepository);
  }

  async getProfile(req: AuthenticatedRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({
          success: false,
          message: 'Usuario no autenticado'
        });
        return;
      }

      const result = await this.getUserProfileUseCase.execute({
        userId: req.user.userId
      });

      res.status(200).json({
        success: true,
        message: 'Perfil obtenido exitosamente',
        data: result
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error instanceof Error ? error.message : 'Error al obtener perfil'
      });
    }
  }
}
