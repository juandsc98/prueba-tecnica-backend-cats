import { IUserRepository } from '@/domain/repositories/IUserRepository';

export interface GetUserProfileRequest {
  userId: string;
}

export interface GetUserProfileResponse {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  edad: number;
  createdAt: Date;
  updatedAt: Date;
}

export class GetUserProfileUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(request: GetUserProfileRequest): Promise<GetUserProfileResponse> {
    const user = await this.userRepository.findById(request.userId);
    
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return {
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      edad: user.edad,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    };
  }
}

