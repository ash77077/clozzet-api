import { EUserRole } from 'src/users/enums/user-role.enum';

export interface IUser {
  id: string;
  username: string;
  password: string;
  salt: string;
  role: EUserRole;
}
