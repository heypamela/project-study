import { MigrationInterface, QueryRunner } from "typeorm";

export class default1664979483852 implements MigrationInterface {
    name = 'default1664979483852'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("idUser" SERIAL NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_65e7c74bbeaca3cb19ae90bf6ee" PRIMARY KEY ("idUser"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
