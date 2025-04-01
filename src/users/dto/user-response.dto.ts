import { EUserRole } from '../enums/user-role.enum';

export class UserResponseDto {
  id: string;
  username: string;
  role: EUserRole;
  createdAt: Date;
  updatedAt: Date;
}
