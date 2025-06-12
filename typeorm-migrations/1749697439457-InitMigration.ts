import { MigrationInterface, QueryRunner } from "typeorm";

export class InitMigration1749697439457 implements MigrationInterface {
    name = 'InitMigration1749697439457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')))`);
        await queryRunner.query(`CREATE TABLE "comment_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "postId" integer)`);
        await queryRunner.query(`CREATE TABLE "tag_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, CONSTRAINT "UQ_45045ce6feb08909365dd6ef402" UNIQUE ("name"))`);
        await queryRunner.query(`CREATE TABLE "post_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "profile_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bio" varchar, "avatar" varchar, "userId" integer, CONSTRAINT "REL_90e4ef505e45d88f8a7794bc1a" UNIQUE ("userId"))`);
        await queryRunner.query(`CREATE TABLE "post_typeorm_tags_tag_typeorm" ("postTypeormId" integer NOT NULL, "tagTypeormId" integer NOT NULL, PRIMARY KEY ("postTypeormId", "tagTypeormId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9777d28fa4095f7373b7b51c4b" ON "post_typeorm_tags_tag_typeorm" ("postTypeormId") `);
        await queryRunner.query(`CREATE INDEX "IDX_40fcc5dc40a696b76d234d111f" ON "post_typeorm_tags_tag_typeorm" ("tagTypeormId") `);
        await queryRunner.query(`CREATE TABLE "temporary_comment_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "postId" integer, CONSTRAINT "FK_aaaea047056e1ffd50403ff8aff" FOREIGN KEY ("userId") REFERENCES "user_typeorm" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, CONSTRAINT "FK_583f8a7053fe927f8a9a7d78bd3" FOREIGN KEY ("postId") REFERENCES "post_typeorm" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_comment_typeorm"("id", "content", "createdAt", "updatedAt", "userId", "postId") SELECT "id", "content", "createdAt", "updatedAt", "userId", "postId" FROM "comment_typeorm"`);
        await queryRunner.query(`DROP TABLE "comment_typeorm"`);
        await queryRunner.query(`ALTER TABLE "temporary_comment_typeorm" RENAME TO "comment_typeorm"`);
        await queryRunner.query(`CREATE TABLE "temporary_post_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, CONSTRAINT "FK_59e944b87bfcb33477a7ca7efc5" FOREIGN KEY ("userId") REFERENCES "user_typeorm" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_post_typeorm"("id", "title", "content", "createdAt", "updatedAt", "userId") SELECT "id", "title", "content", "createdAt", "updatedAt", "userId" FROM "post_typeorm"`);
        await queryRunner.query(`DROP TABLE "post_typeorm"`);
        await queryRunner.query(`ALTER TABLE "temporary_post_typeorm" RENAME TO "post_typeorm"`);
        await queryRunner.query(`CREATE TABLE "temporary_profile_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bio" varchar, "avatar" varchar, "userId" integer, CONSTRAINT "REL_90e4ef505e45d88f8a7794bc1a" UNIQUE ("userId"), CONSTRAINT "FK_90e4ef505e45d88f8a7794bc1a0" FOREIGN KEY ("userId") REFERENCES "user_typeorm" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_profile_typeorm"("id", "bio", "avatar", "userId") SELECT "id", "bio", "avatar", "userId" FROM "profile_typeorm"`);
        await queryRunner.query(`DROP TABLE "profile_typeorm"`);
        await queryRunner.query(`ALTER TABLE "temporary_profile_typeorm" RENAME TO "profile_typeorm"`);
        await queryRunner.query(`DROP INDEX "IDX_9777d28fa4095f7373b7b51c4b"`);
        await queryRunner.query(`DROP INDEX "IDX_40fcc5dc40a696b76d234d111f"`);
        await queryRunner.query(`CREATE TABLE "temporary_post_typeorm_tags_tag_typeorm" ("postTypeormId" integer NOT NULL, "tagTypeormId" integer NOT NULL, CONSTRAINT "FK_9777d28fa4095f7373b7b51c4ba" FOREIGN KEY ("postTypeormId") REFERENCES "post_typeorm" ("id") ON DELETE CASCADE ON UPDATE CASCADE, CONSTRAINT "FK_40fcc5dc40a696b76d234d111f3" FOREIGN KEY ("tagTypeormId") REFERENCES "tag_typeorm" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION, PRIMARY KEY ("postTypeormId", "tagTypeormId"))`);
        await queryRunner.query(`INSERT INTO "temporary_post_typeorm_tags_tag_typeorm"("postTypeormId", "tagTypeormId") SELECT "postTypeormId", "tagTypeormId" FROM "post_typeorm_tags_tag_typeorm"`);
        await queryRunner.query(`DROP TABLE "post_typeorm_tags_tag_typeorm"`);
        await queryRunner.query(`ALTER TABLE "temporary_post_typeorm_tags_tag_typeorm" RENAME TO "post_typeorm_tags_tag_typeorm"`);
        await queryRunner.query(`CREATE INDEX "IDX_9777d28fa4095f7373b7b51c4b" ON "post_typeorm_tags_tag_typeorm" ("postTypeormId") `);
        await queryRunner.query(`CREATE INDEX "IDX_40fcc5dc40a696b76d234d111f" ON "post_typeorm_tags_tag_typeorm" ("tagTypeormId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_40fcc5dc40a696b76d234d111f"`);
        await queryRunner.query(`DROP INDEX "IDX_9777d28fa4095f7373b7b51c4b"`);
        await queryRunner.query(`ALTER TABLE "post_typeorm_tags_tag_typeorm" RENAME TO "temporary_post_typeorm_tags_tag_typeorm"`);
        await queryRunner.query(`CREATE TABLE "post_typeorm_tags_tag_typeorm" ("postTypeormId" integer NOT NULL, "tagTypeormId" integer NOT NULL, PRIMARY KEY ("postTypeormId", "tagTypeormId"))`);
        await queryRunner.query(`INSERT INTO "post_typeorm_tags_tag_typeorm"("postTypeormId", "tagTypeormId") SELECT "postTypeormId", "tagTypeormId" FROM "temporary_post_typeorm_tags_tag_typeorm"`);
        await queryRunner.query(`DROP TABLE "temporary_post_typeorm_tags_tag_typeorm"`);
        await queryRunner.query(`CREATE INDEX "IDX_40fcc5dc40a696b76d234d111f" ON "post_typeorm_tags_tag_typeorm" ("tagTypeormId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9777d28fa4095f7373b7b51c4b" ON "post_typeorm_tags_tag_typeorm" ("postTypeormId") `);
        await queryRunner.query(`ALTER TABLE "profile_typeorm" RENAME TO "temporary_profile_typeorm"`);
        await queryRunner.query(`CREATE TABLE "profile_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "bio" varchar, "avatar" varchar, "userId" integer, CONSTRAINT "REL_90e4ef505e45d88f8a7794bc1a" UNIQUE ("userId"))`);
        await queryRunner.query(`INSERT INTO "profile_typeorm"("id", "bio", "avatar", "userId") SELECT "id", "bio", "avatar", "userId" FROM "temporary_profile_typeorm"`);
        await queryRunner.query(`DROP TABLE "temporary_profile_typeorm"`);
        await queryRunner.query(`ALTER TABLE "post_typeorm" RENAME TO "temporary_post_typeorm"`);
        await queryRunner.query(`CREATE TABLE "post_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "title" varchar NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer)`);
        await queryRunner.query(`INSERT INTO "post_typeorm"("id", "title", "content", "createdAt", "updatedAt", "userId") SELECT "id", "title", "content", "createdAt", "updatedAt", "userId" FROM "temporary_post_typeorm"`);
        await queryRunner.query(`DROP TABLE "temporary_post_typeorm"`);
        await queryRunner.query(`ALTER TABLE "comment_typeorm" RENAME TO "temporary_comment_typeorm"`);
        await queryRunner.query(`CREATE TABLE "comment_typeorm" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "content" varchar NOT NULL, "createdAt" datetime NOT NULL DEFAULT (datetime('now')), "updatedAt" datetime NOT NULL DEFAULT (datetime('now')), "userId" integer, "postId" integer)`);
        await queryRunner.query(`INSERT INTO "comment_typeorm"("id", "content", "createdAt", "updatedAt", "userId", "postId") SELECT "id", "content", "createdAt", "updatedAt", "userId", "postId" FROM "temporary_comment_typeorm"`);
        await queryRunner.query(`DROP TABLE "temporary_comment_typeorm"`);
        await queryRunner.query(`DROP INDEX "IDX_40fcc5dc40a696b76d234d111f"`);
        await queryRunner.query(`DROP INDEX "IDX_9777d28fa4095f7373b7b51c4b"`);
        await queryRunner.query(`DROP TABLE "post_typeorm_tags_tag_typeorm"`);
        await queryRunner.query(`DROP TABLE "profile_typeorm"`);
        await queryRunner.query(`DROP TABLE "post_typeorm"`);
        await queryRunner.query(`DROP TABLE "tag_typeorm"`);
        await queryRunner.query(`DROP TABLE "comment_typeorm"`);
        await queryRunner.query(`DROP TABLE "user_typeorm"`);
    }

}
