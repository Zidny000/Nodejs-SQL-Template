import { MigrationInterface, QueryRunner } from "typeorm";

export class AddAccessLogMigration1756651235674 implements MigrationInterface {
    name = 'AddAccessLogMigration1756651235674'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`album\` DROP FOREIGN KEY \`FK_3d06f25148a4a880b429e3bc839\``);
        await queryRunner.query(`ALTER TABLE \`album\` CHANGE \`artistId\` \`artistId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_997cfd9e91fd00a363500f72dc2\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_b105d945c4c185395daca91606a\``);
        await queryRunner.query(`ALTER TABLE \`track\` CHANGE \`artistId\` \`artistId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`track\` CHANGE \`albumId\` \`albumId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`artist\` DROP FOREIGN KEY \`FK_3c2c776c0a094c15d6c165494c0\``);
        await queryRunner.query(`ALTER TABLE \`artist\` CHANGE \`userId\` \`userId\` varchar(255) NULL`);
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP FOREIGN KEY \`FK_83b775fdebbe24c29b2b5831f2d\``);
        await queryRunner.query(`ALTER TABLE \`favorite\` CHANGE \`userId\` \`userId\` varchar(36) NULL`);
        await queryRunner.query(`ALTER TABLE \`album\` ADD CONSTRAINT \`FK_3d06f25148a4a880b429e3bc839\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_997cfd9e91fd00a363500f72dc2\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_b105d945c4c185395daca91606a\` FOREIGN KEY (\`albumId\`) REFERENCES \`album\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`artist\` ADD CONSTRAINT \`FK_3c2c776c0a094c15d6c165494c0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD CONSTRAINT \`FK_83b775fdebbe24c29b2b5831f2d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`favorite\` DROP FOREIGN KEY \`FK_83b775fdebbe24c29b2b5831f2d\``);
        await queryRunner.query(`ALTER TABLE \`artist\` DROP FOREIGN KEY \`FK_3c2c776c0a094c15d6c165494c0\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_b105d945c4c185395daca91606a\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_997cfd9e91fd00a363500f72dc2\``);
        await queryRunner.query(`ALTER TABLE \`album\` DROP FOREIGN KEY \`FK_3d06f25148a4a880b429e3bc839\``);
        await queryRunner.query(`ALTER TABLE \`favorite\` CHANGE \`userId\` \`userId\` varchar(36) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`favorite\` ADD CONSTRAINT \`FK_83b775fdebbe24c29b2b5831f2d\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`artist\` CHANGE \`userId\` \`userId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`artist\` ADD CONSTRAINT \`FK_3c2c776c0a094c15d6c165494c0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track\` CHANGE \`albumId\` \`albumId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`track\` CHANGE \`artistId\` \`artistId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_b105d945c4c185395daca91606a\` FOREIGN KEY (\`albumId\`) REFERENCES \`album\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_997cfd9e91fd00a363500f72dc2\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`album\` CHANGE \`artistId\` \`artistId\` varchar(255) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`album\` ADD CONSTRAINT \`FK_3d06f25148a4a880b429e3bc839\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

}
