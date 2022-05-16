import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/User.entity';
import { typeOrmModuleOptions } from 'typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: any) => ({
        ...typeOrmModuleOptions,
      }),
    }),
  ],
})
export class DatabaseModule { }
