import { Request, Response, NextFunction } from 'express';
import { JwtAuthService } from '@/infrastructure/services/JwtAuthService';

export interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email: string;
  };
}

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'Token de autenticación requerido'
      });
      return;
    }

    const token = authHeader.substring(7); // Remover "Bearer "
    const authService = new JwtAuthService();
    
    const decoded = authService.verifyToken(token);
    req.user = decoded;
    
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

