import { AuthDto } from './dto/auth.dto';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass): Promise<any> {
    console.log("UserValidation", email)
    const user = await this.usersService.findOne(email);

    if (!user) {
      return null;
    }
    
    const isMatch = await bcrypt.compare(pass, user.password);

    if (!isMatch) {
      return null;
    }

    const { password, ...result } = user;

    return user;
  }

  async login(_user: AuthDto) {
    const user = await this.usersService.findOne(_user.email);

    const token: any = this._generateToken({...user});

    // console.log("TOKEN", token)

    return token;
  }

  async validateToken(token: string) {
    const tokenInfo: any = this.jwtService.decode(token);
    if (tokenInfo && tokenInfo.email) {
      const user = await this.usersService.findOne(tokenInfo.email);
      return user;
    }

    // const token: any = this._generateToken({...user});

    console.log("tokenInfo", tokenInfo)

    return token;
  }

  _generateToken(user) {
    const {password, ...userToken} = user;
    const accessToken = this.jwtService.sign(userToken);
    return accessToken;
  }
}
