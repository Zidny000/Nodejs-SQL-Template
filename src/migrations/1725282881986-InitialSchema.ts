import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialSchema1725282881986 implements MigrationInterface {
    name = 'InitialSchema1725282881986'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`album\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`year\` int NOT NULL, \`artistId\` varchar(255) NULL, \`hidden\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`track\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`artistId\` varchar(255) NULL, \`albumId\` varchar(255) NULL, \`duration\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`artist\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`userId\` varchar(255) NULL, \`hidden\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`access_log\` (\`id\` varchar(36) NOT NULL, \`userId\` varchar(255) NOT NULL, \`accessDate\` datetime NOT NULL, \`action\` enum ('CREATE', 'READ', 'UPDATE', 'DELETE') NOT NULL, \`entity\` enum ('ALBUM', 'TRACK', 'ARTIST') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`fullname\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`login\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`favorite\` (\`id\` varchar(36) NOT NULL, \`entityId\` varchar(255) NOT NULL, \`userId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`album\` ADD CONSTRAINT \`FK_3d06f25148a4a880b429e3bc839\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_997cfd9e91fd00a363500f72dc2\` FOREIGN KEY (\`artistId\`) REFERENCES \`artist\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`track\` ADD CONSTRAINT \`FK_b105d945c4c185395daca91606a\` FOREIGN KEY (\`albumId\`) REFERENCES \`album\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`artist\` ADD CONSTRAINT \`FK_3c2c776c0a094c15d6c165494c0\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`access_log\` ADD CONSTRAINT \`FK_075b46f92f8ea94c3e4ba8ca322\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`access_log\` DROP FOREIGN KEY \`FK_075b46f92f8ea94c3e4ba8ca322\``);
        await queryRunner.query(`ALTER TABLE \`artist\` DROP FOREIGN KEY \`FK_3c2c776c0a094c15d6c165494c0\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_b105d945c4c185395daca91606a\``);
        await queryRunner.query(`ALTER TABLE \`track\` DROP FOREIGN KEY \`FK_997cfd9e91fd00a363500f72dc2\``);
        await queryRunner.query(`ALTER TABLE \`album\` DROP FOREIGN KEY \`FK_3d06f25148a4a880b429e3bc839\``);
        await queryRunner.query(`DROP TABLE \`favorite\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`access_log\``);
        await queryRunner.query(`DROP TABLE \`artist\``);
        await queryRunner.query(`DROP TABLE \`track\``);
        await queryRunner.query(`DROP TABLE \`album\``);
    }

}

