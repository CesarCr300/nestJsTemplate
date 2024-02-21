import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './utils/isPublic';

@Controller('auth')
export class AuthController {
  constructor(private _service: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    return this._service.login(req.user);
  }

  // @Get('user')
  // getUser(@Request() req) {
  //   return req.user;
  // }
}
