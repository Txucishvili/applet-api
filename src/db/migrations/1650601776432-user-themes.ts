import { MigrationInterface, QueryRunner } from "typeorm";

export class userThemes1650601776432 implements MigrationInterface {
    name = 'userThemes1650601776432'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`theme\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`theme\``);
    }

}
