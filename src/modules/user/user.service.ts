import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';
import { UserRepository } from './repository/user.repository';
import { ServiceBase } from 'src/base/service.base';
import { User } from './entities/user.entity';

@Injectable()
export class UserService extends ServiceBase<
  {
    name: 'User';
    type: User;
  },
  User,
  UpdateUserDto,
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

  // async findAll() {
  //   return `This action returns all user`;
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
