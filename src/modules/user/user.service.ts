import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repository/user.repository';
import { ServiceBase } from '../../base/service.base';
import { User } from './entities/user.entity';
import { FilterUserDto } from './dto/filter-user.dto';

@Injectable()
export class UserService extends ServiceBase<
  {
    name: 'User';
    type: User;
  },
  User,
  FilterUserDto,
  CreateUserDto,
  UpdateUserDto
> {
  constructor(_usersRepository: UserRepository) {
    super(
      _usersRepository,
      (dto: CreateUserDto) => ({ email: dto.email }),
      'el',
      'usuario',
    );
  }
}
