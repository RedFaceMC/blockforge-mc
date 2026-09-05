import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export const creatorProfiles = mysqlTable("creator_profiles", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull().unique(),
  handle: varchar("handle", { length: 80 }).notNull().unique(),
  displayName: varchar("displayName", { length: 160 }).notNull(),
  bio: text("bio"),
  avatarUrl: text("avatarUrl"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const publishedProjects = mysqlTable("published_projects", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  slug: varchar("slug", { length: 180 }).notNull().unique(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 32 }).notNull(),
  versions: text("versions"),
  loaders: text("loaders"),
  changelog: text("changelog"),
  downloadUrl: text("downloadUrl"),
  screenshotKeys: text("screenshotKeys"),
  status: mysqlEnum("status", ["draft", "published", "archived"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const creatorDrafts = mysqlTable("creator_drafts", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  name: varchar("name", { length: 160 }).notNull(),
  description: text("description").notNull(),
  category: varchar("category", { length: 32 }).notNull(),
  versions: text("versions"),
  loaders: text("loaders"),
  changelog: text("changelog"),
  downloadUrl: text("downloadUrl"),
  screenshotKeys: text("screenshotKeys"),
  status: mysqlEnum("status", ["draft", "submitted"]).default("draft").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export const favorites = mysqlTable("favorites", {
  id: int("id").autoincrement().primaryKey(),
  ownerId: int("ownerId").notNull(),
  projectId: varchar("projectId", { length: 180 }).notNull(),
  source: varchar("source", { length: 32 }).default("Modrinth").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type CreatorProfile = typeof creatorProfiles.$inferSelect;
export type InsertCreatorProfile = typeof creatorProfiles.$inferInsert;
export type PublishedProject = typeof publishedProjects.$inferSelect;
export type InsertPublishedProject = typeof publishedProjects.$inferInsert;
export type CreatorDraft = typeof creatorDrafts.$inferSelect;
export type InsertCreatorDraft = typeof creatorDrafts.$inferInsert;
export type Favorite = typeof favorites.$inferSelect;
