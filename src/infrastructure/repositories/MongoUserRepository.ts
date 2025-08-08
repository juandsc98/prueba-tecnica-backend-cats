import { User, UserWithoutPassword } from '@/domain/entities/User';
import { IUserRepository } from '@/domain/repositories/IUserRepository';
import { UserModel } from '../database/UserModel';

export class MongoUserRepository implements IUserRepository {
  async create(user: User): Promise<UserWithoutPassword> {
    const newUser = new UserModel(user);
    const savedUser = await newUser.save();
    
    return {
      id: (savedUser._id as any).toString(),
      nombre: savedUser.nombre,
      email: savedUser.email,
      telefono: savedUser.telefono,
      edad: savedUser.edad,
      createdAt: savedUser.createdAt!,
      updatedAt: savedUser.updatedAt!
    };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await UserModel.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return null;
    }

    return {
      id: (user._id as any).toString(),
      nombre: user.nombre,
      email: user.email,
      password: user.password,
      telefono: user.telefono,
      edad: user.edad,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!
    };
  }

  async findById(id: string): Promise<UserWithoutPassword | null> {
    const user = await UserModel.findById(id);
    
    if (!user) {
      return null;
    }

    return {
      id: (user._id as any).toString(),
      nombre: user.nombre,
      email: user.email,
      telefono: user.telefono,
      edad: user.edad,
      createdAt: user.createdAt!,
      updatedAt: user.updatedAt!
    };
  }

  async update(id: string, userData: Partial<User>): Promise<UserWithoutPassword | null> {
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { ...userData, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return null;
    }

    return {
      id: (updatedUser._id as any).toString(),
      nombre: updatedUser.nombre,
      email: updatedUser.email,
      telefono: updatedUser.telefono,
      edad: updatedUser.edad,
      createdAt: updatedUser.createdAt!,
      updatedAt: updatedUser.updatedAt!
    };
  }

  async delete(id: string): Promise<boolean> {
    const result = await UserModel.findByIdAndDelete(id);
    return result !== null;
  }
}
