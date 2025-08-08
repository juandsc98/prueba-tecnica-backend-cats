import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAuthService } from '../../domain/services/IAuthService';

export class JwtAuthService implements IAuthService {
  private readonly jwtSecret: string;
  private readonly jwtExpiresIn: string;
  private readonly bcryptRounds: number;

  constructor() {
    this.jwtSecret = process.env.JWT_SECRET || 'default-secret-key';
    this.jwtExpiresIn = process.env.JWT_EXPIRES_IN || '24h';
    this.bcryptRounds = parseInt(process.env.BCRYPT_ROUNDS || '12');
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, this.bcryptRounds);
  }

  async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateToken(payload: any): string {
    return jwt.sign(payload, this.jwtSecret, {
      expiresIn: this.jwtExpiresIn
    } as jwt.SignOptions);
  }

  verifyToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (error) {
      throw new Error('Token inválido');
    }
  }
}

