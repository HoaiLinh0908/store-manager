import { UserStatus } from 'src/utils/constants';

export class SignUpDao {
  email: string;
  hash: string;
  firstName: string;
  lastName: string;
  status: UserStatus;
}
