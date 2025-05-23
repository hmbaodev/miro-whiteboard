"use client";

import { memo } from "react";
import { MousePointer2 } from "lucide-react";
import { useOther } from "@liveblocks/react";

import { connectionIdToColor } from "@/lib/utils";

interface CursorProps {
  connectionId: number;
}

const Cursor = memo(({ connectionId }: CursorProps) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (other) => other.presence.cursor);

  const name = info.name || "Teammate";

  console.log({ info, cursor }, "PARTNER_CURSOR");

  if (!cursor) return null;

  const { x, y } = cursor;

  return (
    <foreignObject
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className="relative drop-shadow-md"
    >
      <MousePointer2
        className="size-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 rounded-md px-1.5 py-0.5 text-xs font-semibold text-white"
        style={{
          backgroundColor: connectionIdToColor(connectionId),
        }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";

export default Cursor;
