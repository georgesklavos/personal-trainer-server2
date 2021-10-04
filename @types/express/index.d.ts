import { Users } from 'src/entities/users.entity';

declare global {
  namespace Express {
    class User extends Users {}
  }
}
