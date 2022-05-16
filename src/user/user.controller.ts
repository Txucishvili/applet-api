import { AuthDto } from './../auth/dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { CheclEmailDto, UserDto } from './dto/user.dto';
import { AuthService } from 'src/auth/auth.service';
import { AuthUserGuard } from 'src/auth/guards/authenticated.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }


  @Post('sign-up')
  async signUp(@Body() user: UserDto, @Request() req) {
    const _resp = await this.userService.registerUser(user);
    return _resp;
  }

  @Post('checkEmail')
  async checkEmail(@Body() params: CheclEmailDto, @Request() req) {
    const _resp = await this.userService.checkEmail(params.email);
    return _resp;
  }

  @UseGuards(AuthUserGuard)
  @ApiBearerAuth()
  @Get('get-user')
  async getUser(@Request() req) {
    console.log("getUser");
    return req.user;
  }

}

