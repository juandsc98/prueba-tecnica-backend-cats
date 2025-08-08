import mongoose, { Document, Schema } from 'mongoose';
import { User } from '../../domain/entities/User';

export interface UserDocument extends Omit<User, 'id'>, Document {}

const userSchema = new Schema<UserDocument>({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
    minlength: [2, 'El nombre debe tener al menos 2 caracteres']
  },
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'El email no es válido']
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono es requerido'],
    trim: true,
    minlength: [8, 'El teléfono debe tener al menos 8 dígitos']
  },
  edad: {
    type: Number,
    required: [true, 'La edad es requerida'],
    min: [1, 'La edad debe ser mayor a 0'],
    max: [120, 'La edad debe ser menor a 120']
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete (ret as any).password;
      return ret;
    }
  }
});

export const UserModel = mongoose.model<UserDocument>('User', userSchema);

