import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { User } from './entities/user.entity';
// import { Repository } from 'typeorm';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    // @InjectRepository(User)
    // private _usersRepository: Repository<User>,
    private _usersRepository: UserRepository,
  ) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    console.log(await this._usersRepository.findAll());
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
