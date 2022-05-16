import { Logger, Module } from "@nestjs/common";
import { DatabaseModule } from "../database.module";
import { Seeder } from ".";
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theme } from 'src/themes/entities/theme.entity';
import { ThemeSeederService } from "./services/theme";

@Module({
  imports: [DatabaseModule,
    TypeOrmModule.forFeature([
      Theme
    ])],
  providers: [Logger, Seeder, ThemeSeederService],
})
export class SeederModule { }