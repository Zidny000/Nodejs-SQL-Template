import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateFavorite1725349330265 implements MigrationInterface {
    name = 'UpdateFavorite1725349330265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_997cfd9e91fd00a363500f72dc2\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_b105d945c4c185395daca91606a\``);
        await queryRunner.query(`ALTER TABLE \`track\` ADD \`hidden\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD \`entityType\` enum ('artist', 'album', 'track') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_997cfd9e91fd00a363500f72dc2\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_b105d945c4c185395daca91606a\` FOREIGN KEY (\`albumId\`) REFERENCES \`album\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD CONSTRAINT \`FK_83b775fdebbe24c29b2b5831f2d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP FOREIGN KEY \`FK_83b775fdebbe24c29b2b5831f2d\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_b105d945c4c185395daca91606a\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_997cfd9e91fd00a363500f72dc2\``);
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP COLUMN \`userId\``);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD \`userId\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP COLUMN \`entityType\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP COLUMN \`hidden\``);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_b105d945c4c185395daca91606a\` FOREIGN KEY (\`albumId\`) REFERENCES \`album\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_997cfd9e91fd00a363500f72dc2\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
