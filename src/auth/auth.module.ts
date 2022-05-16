import { SessionSerilizer } from './session.serilizer';
import { UserService } from './../user/user.service';
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    UserModule,
    PassportModule.register({
      property: 'user',
      session: true,
    }),
    JwtModule.register({
      secret: 'app secret key',
      verifyOptions: {

      },
      signOptions: { expiresIn: '5m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, SessionSerilizer],
  exports: [AuthService],
})
export class AuthModule { }
