import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserIdToFavorite1725272090524 implements MigrationInterface {
    name = 'AddUserIdToFavorite1725272090524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD \`userId\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP COLUMN \`userId\``);
    }

}
