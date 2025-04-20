"use client";

import { memo } from "react";

import { useOthersConnectionIds } from "@liveblocks/react";
import Cursor from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor connectionId={connectionId} key={connectionId} />
      ))}
    </>
  );
};

const CursorsPresence = memo(() => {
  return <Cursors />;
});

CursorsPresence.displayName = "CursorsPresence";

export default CursorsPresence;
