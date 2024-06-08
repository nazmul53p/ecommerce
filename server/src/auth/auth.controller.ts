import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CreateUserDto } from 'auth/user/dto';
import { UserAndRequest } from 'types';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AccessRoles } from './role/role.decorator';
import { RoleGuard } from './role/role.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() authLoginDto: CreateUserDto) {
    return this.authService.signup(authLoginDto);
  }

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @Get('profile')
  @ApiBearerAuth()
  @AccessRoles(['admin'])
  @UseGuards(JwtAuthGuard, RoleGuard)
  async test(@Req() req: UserAndRequest) {
    console.log('User:', req.user.role.name);
    return req.user;
  }
}
