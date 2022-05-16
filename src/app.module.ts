import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './db/database.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Connection } from 'typeorm';
import { ThemesModule } from './themes/themes.module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule, ThemesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {

  }
}
