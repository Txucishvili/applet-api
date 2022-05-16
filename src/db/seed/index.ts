import { Injectable, Logger } from "@nestjs/common";
import { ThemeSeederService } from "./services/theme";

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly themeSeeder: ThemeSeederService,
  ) { }

  async seed() {
    await this.themes()
      .then(completed => {
        this.logger.debug('Successfuly completed seeding Themes...'); 
        Promise.resolve(completed);
      })
      .catch(error => {
        this.logger.error('Failed seeding Themes...'); 
        Promise.reject(error);
      });
  }

  async themes() {
    return await Promise.all(this.themeSeeder.create())
      .then(createdLanguages => {
        // Can also use this.logger.verbose('...');
        this.logger.debug(
          'No. of Themes created : ' +
          // Remove all null values and return only created languages.
          createdLanguages.filter(
            nullValueOrCreatedLanguage => nullValueOrCreatedLanguage,
          ).length,
        ); return Promise.resolve(true);
      })
      .catch(error => Promise.reject(error));
  }
}