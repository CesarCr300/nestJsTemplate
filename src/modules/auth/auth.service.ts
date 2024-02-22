import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/modules/user/repository/user.repository';
import { HashingUtil } from 'src/utils/hashing';
import { User } from '../user/entities/user.entity';
import { UserPayload } from '../user/entities/payload-user.entity';

@Injectable()
export class AuthService {
  constructor(
    private _userRepository: UserRepository,
    private _jwt: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this._userRepository.findOne({ email });
    if (user && HashingUtil.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload: UserPayload = {
      email: user.email,
      sub: user.id,
      userTypeId: user.userTypeId,
    };
    return {
      access_token: this._jwt.sign(payload),
    };
  }
}
