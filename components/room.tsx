"use client";

import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

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
      
    >
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={fallback}>{children}</ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
};

export default Room;
