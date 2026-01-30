export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  roleLabel?: string;
  phone?: string;
  active: boolean;
  permissions?: string[];
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  role: string;
  phone?: string;
  active?: boolean;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  phone?: string;
  active?: boolean;
}

export interface ChangePasswordDto {
  currentPassword: string;
  newPassword: string;
}

export interface RoleInfo {
  value: string;
  label: string;
  permissions: string[];
  description: string;
}

export interface UserResponse {
  success: boolean;
  data: User | User[];
  message?: string;
}