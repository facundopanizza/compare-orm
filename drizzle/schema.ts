import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const usersTable = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const postsTable = sqliteTable("posts", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    title: text("title").notNull(),
    content: text("content").notNull(),
    userId: integer("user_id").notNull().references(() => usersTable.id),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const commentsTable = sqliteTable("comments", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    content: text("content").notNull(),
    userId: integer("user_id").notNull().references(() => usersTable.id),
    postId: integer("post_id").notNull().references(() => postsTable.id),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const profilesTable = sqliteTable("profiles", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    bio: text("bio"),
    avatar: text("avatar"),
    userId: integer("user_id").notNull().unique().references(() => usersTable.id),
});

export const tagsTable = sqliteTable("tags", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    name: text("name").notNull().unique(),
    createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const postTagsTable = sqliteTable("post_tags", {
    postId: integer("post_id").notNull().references(() => postsTable.id),
    tagId: integer("tag_id").notNull().references(() => tagsTable.id),
});