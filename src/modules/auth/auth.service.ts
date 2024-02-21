import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { HashingUtil } from 'src/utils/hashing';

@Injectable()
export class AuthService {
  constructor(private _userRepository: UserRepository) {}

  async validateUser(email: string, password: string) {
    const user = await this._userRepository.findOne({ email });
    if (user && HashingUtil.compare(password, user.password)) {
      return user;
    }
    return null;
  }
}
