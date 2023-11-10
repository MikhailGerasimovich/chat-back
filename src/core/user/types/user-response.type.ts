import { User } from '../schemas';

export class UserResponse {
  public _id: string;
  public username: string;
  public role: string;

  constructor(user: User) {
    this._id = user._id;
    this.username = user.username;
    this.role = user.role;
  }
}
