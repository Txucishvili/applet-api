import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Theme } from "src/themes/entities/theme.entity";
import { ITheme } from "src/themes/themes.type";
import { Repository } from "typeorm";

export const DefaultTheme = { name: 'default', key: '1' };

export const themes: ITheme[] = [
  { name: 'customm', key: '0', isDefault: false},
  { name: 'default', key: '1', isDefault: true},
  { name: 'simple', key: '2', isDefault: false},
  { name: 'light', key: '3', isDefault: false},
];

@Injectable()
export class ThemeSeederService {

  constructor(
    @InjectRepository(Theme)
    private readonly themeRepo: Repository<Theme>,
  ) { }

  create(): Array<Promise<Theme>> {
    return themes.map(async (language: ITheme) => {
      return await this.themeRepo
        .findOneBy({ name: language.name })
        .then(async dbLangauge => {
          // We check if a language already exists.
          // If it does don't create a new one.
          if (dbLangauge) {
            return Promise.resolve(null);
          } return Promise.resolve(
            await this.themeRepo.save(language),
          );
        })
        .catch(error => Promise.reject(error));
    });
  }
}