import { Liveblocks } from "@liveblocks/node";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser"; // Subscribes to Convex query functions and executes mutations and actions over a WebSocket.

import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret: process.env.LIVEBLOCKS_SECRET_KEY!,
});

// Permit access to the room only if the current user has the same orgId as the current board
export async function POST(request: Request) {
  const authorization = await auth();
  const user = await currentUser();

  // if there's no user or the current user doesn't have permission to access the room, return 403
  // Because authentication is checked here, we don't need to check authorization in the Convex query (api.board.getBoard)
  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }

  // use room as boardId to query the current board from Convex
  const { room } = await request.json();
  const board = await convex.query(api.board.getBoard, { id: room });

  // console.log("AUTH_INFO", {
  //   authorization,
  //   user,
  //   boardOrgId: board?.orgId,
  //   userOrgId: authorization.orgId,
  // });

  // If user access the board that doesn't belong to the current organization, return 403
  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  // now check if current user belong to the current organization, if yes, that user has access to all the current board (that means users in the same org can access all the boards in the org)
  const userInfo = {
    name: user.firstName || "Teammate",
    picture: user.imageUrl!,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  const { body, status } = await session.authorize();

  return new Response(body, { status });
}
