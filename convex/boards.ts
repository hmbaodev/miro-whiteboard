import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";

import { query } from "./_generated/server";

export const getBoards = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favorites: v.optional(v.any()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      // ! It shows the error when switching between organizations, but the app still runs good 🙂
      throw new Error("⚠️ Unauthorized! ⚠️");
    }

    const userId = identity.subject;

    if (args.favorites) {
      const favoriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", userId).eq("orgId", args.orgId),
        )
        .order("desc")
        .collect();

      // Map with boards, because in favorite table we don't have enough fields to show on UI
      const ids = favoriteBoards.map((fav) => fav.boardId);

      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => ({
        ...board,
        isFavorite: true,
      }));
    }

    const title = args.search as string;
    let boards = [];

    if (title) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", title).eq("orgId", args.orgId),
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    // Add favorite relation to each board
    const boardsWithFavoriteRelation = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", userId).eq("boardId", board._id),
        )
        .unique()
        .then((favorite) => {
          return {
            ...board,
            isFavorite: !!favorite, // To make sure isFavorite is boolean type
          };
        });
    });

    // Wait for all favorite status checks to complete in parallel
    const boardsWithFavoriteBoolean = Promise.all(boardsWithFavoriteRelation);

    return boardsWithFavoriteBoolean;
  },
});
