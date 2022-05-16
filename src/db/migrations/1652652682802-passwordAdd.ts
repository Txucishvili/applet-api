import { MigrationInterface, QueryRunner } from "typeorm";

export class passwordAdd1652652682802 implements MigrationInterface {
    name = 'passwordAdd1652652682802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`password\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`password\``);
    }

}
