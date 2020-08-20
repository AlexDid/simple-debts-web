import { User } from '../../../../core/models';

export interface SelectUserForm {
  userId: string;
  selectedUser: User;
}
