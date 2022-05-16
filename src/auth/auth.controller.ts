import { AuthUserGuard } from 'src/auth/guards/authenticated.guard';
import { UserService } from 'src/user/user.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthDto, TokenDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

type AuthType = {
  email: string;
  password: string
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: AuthDto, @Request() req) {
    const token = await this.authService.login(body);
    return {
      user: req.user,
      token: token
    };
  }


  @Post('validate')
  async validate(@Body() body: TokenDto, @Request() req) {
    const token = await this.authService.validateToken(body.token);
    return token
  }

  @UseGuards(AuthUserGuard)
  @Get('logout')
  async logOut(@Request() req) {
    req.session.destroy();
    return { logged: 'out' };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
