"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react";

interface RoomProps {
  children: React.ReactNode;
  roomId: string;
  fallback: React.ReactNode;
}

const Room = ({ children, roomId, fallback }: RoomProps) => {
  return (
    <LiveblocksProvider
      // Don't use both publicApiKey and authEndpoint at the same time.
      // Liveblocks doesn't recommend use publicApiKey for production.
      // publicApiKey={process.env.NEXT_PUBLIC_LIVEBLOCKS_API_KEY!}
      authEndpoint="/api/liveblocks-auth"
      throttle={16}
    >
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null,
        }}
      >
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
