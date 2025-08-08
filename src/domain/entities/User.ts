export interface User {
  id?: string;
  nombre: string;
  email: string;
  password: string;
  telefono: string;
  edad: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserWithoutPassword {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  edad: number;
  createdAt: Date;
  updatedAt: Date;
}

