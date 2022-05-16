import { MigrationInterface, QueryRunner } from "typeorm";

export class changes21650594978056 implements MigrationInterface {
    name = 'changes21650594978056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`theme\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`key\` varchar(255) NOT NULL, \`isDefault\` tinyint NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`theme\``);
    }

}
