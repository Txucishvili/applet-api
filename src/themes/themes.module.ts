import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from './entities/theme.entity';
import { ThemesService } from './themes.service';
@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Theme])],
  providers: [ThemesService],
})
export class ThemesModule {}
