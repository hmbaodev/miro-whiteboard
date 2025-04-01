import { v } from "convex/values";

import { mutation } from "./_generated/server";

const images = [
  "/placeholders/1.svg",
  "/placeholders/2.svg",
  "/placeholders/3.svg",
  "/placeholders/4.svg",
  "/placeholders/5.svg",
  "/placeholders/6.svg",
  "/placeholders/7.svg",
  "/placeholders/8.svg",
  "/placeholders/9.svg",
  "/placeholders/10.svg",
];

export const createBoard = mutation({
  args: {
    orgId: v.string(),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("⚠️ Unauthorized! ⚠️");

    const randomImage = images[Math.floor(Math.random() * images.length)];

    const board = await ctx.db.insert("boards", {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage,
    });

    return board;
  },
});

export const removeBoard = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("⚠️ Unauthorized! ⚠️");

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", args.id),
      )
      .unique();

    if (existingFavorite) {
      await ctx.db.delete(existingFavorite._id);
    }

    await ctx.db.delete(args.id);
  },
});

export const updateBoard = mutation({
  args: { id: v.id("boards"), title: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("⚠️ Unauthorized! ⚠️");

    const title = args.title.trim();

    if (!title) throw new Error("❌ Title is required! ❌");

    const TITLE_MAX_LENGTH = 60;
    if (title.length > TITLE_MAX_LENGTH) {
      throw new Error("❌ Title cannot be longer than 60 characters! ❌");
    }

    const board = ctx.db.patch(args.id, {
      title: args.title,
    });

    return board;
  },
});

export const favoriteBoard = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("⚠️ Unauthorized! ⚠️");

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("❌ Board not found! ❌");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id),
      )
      .unique();

    if (existingFavorite) throw new Error("❌ Board already favorite! ❌");

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    // ! No matter what's returned here because we don't use this value
    return board;
  },
});

export const unfavoriteBoard = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) throw new Error("⚠️ Unauthorized! ⚠️");

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("❌ Board not found! ❌");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id),
      )
      .unique();

    if (!existingFavorite) throw new Error("❌ Favorite board isn't exist! ❌");

    await ctx.db.delete(existingFavorite._id);

    // ! No matter what's returned here because we don't use this value
    return board;
  },
});
