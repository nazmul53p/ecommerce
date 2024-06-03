import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserAndRequest } from 'types';
import { AuthService } from './auth.service';
import { AuthLoginDto } from './dto/auth-login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() authLoginDto: AuthLoginDto) {
    return this.authService.login(authLoginDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('test')
  async test(@Req() req: UserAndRequest) {
    console.log('User:', req.user);
    return req.user;
  }
}
