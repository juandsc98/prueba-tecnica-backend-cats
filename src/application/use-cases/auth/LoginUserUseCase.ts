import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';

export interface LoginUserRequest {
  email: string;
  password: string;
}

export interface LoginUserResponse {
  user: {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    edad: number;
  };
  token: string;
}

export class LoginUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(request: LoginUserRequest): Promise<LoginUserResponse> {
    // Buscar usuario por email
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    // Verificar contraseña
    const isPasswordValid = await this.authService.comparePassword(
      request.password,
      user.password
    );

    if (!isPasswordValid) {
      throw new Error('Credenciales inválidas');
    }

    // Generar token
    const token = this.authService.generateToken({
      userId: user.id,
      email: user.email
    });

    return {
      user: {
        id: user.id!,
        nombre: user.nombre,
        email: user.email,
        telefono: user.telefono,
        edad: user.edad
      },
      token
    };
  }
}

