import { User, UserWithoutPassword } from '../../../domain/entities/User';
import { IUserRepository } from '../../../domain/repositories/IUserRepository';
import { IAuthService } from '../../../domain/services/IAuthService';

export interface RegisterUserRequest {
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  edad: number;
}

export interface RegisterUserResponse {
  user: UserWithoutPassword;
  token: string;
}

export class RegisterUserUseCase {
  constructor(
    private userRepository: IUserRepository,
    private authService: IAuthService
  ) {}

  async execute(request: RegisterUserRequest): Promise<RegisterUserResponse> {
    // Verificar si el usuario ya existe
    const existingUser = await this.userRepository.findByEmail(request.email);
    if (existingUser) {
      throw new Error('El usuario ya existe con este email');
    }

    // Validar datos
    this.validateUserData(request);

    // Hashear la contraseña
    const hashedPassword = await this.authService.hashPassword(request.password);

    // Crear el usuario
    const user: User = {
      nombre: request.nombre,
      email: request.email,
      password: hashedPassword,
      telefono: request.telefono,
      edad: request.edad
    };

    const createdUser = await this.userRepository.create(user);

    // Generar token
    const token = this.authService.generateToken({
      userId: createdUser.id,
      email: createdUser.email
    });

    return {
      user: createdUser,
      token
    };
  }

  private validateUserData(data: RegisterUserRequest): void {
    if (!data.nombre || data.nombre.trim().length < 2) {
      throw new Error('El nombre debe tener al menos 2 caracteres');
    }

    if (!data.email || !this.isValidEmail(data.email)) {
      throw new Error('El email no es válido');
    }

    if (!data.password || data.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }

    if (!data.telefono || data.telefono.trim().length < 8) {
      throw new Error('El teléfono debe tener al menos 8 dígitos');
    }

    if (!data.edad || data.edad < 1 || data.edad > 120) {
      throw new Error('La edad debe estar entre 1 y 120 años');
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

