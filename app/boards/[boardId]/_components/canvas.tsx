"use client";

import { useState, useCallback } from "react";
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
} from "@liveblocks/react";

import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import CursorsPresence from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const onWheel = useCallback((ev: React.WheelEvent) => {
    setCamera({
      x: camera.x - ev.deltaX,
      y: camera.y - ev.deltaY,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onPointerMove = useMutation(
    ({ setMyPresence }, ev: React.PointerEvent) => {
      ev.preventDefault();

      const current = pointerEventToCanvasPoint(ev, camera);
      setMyPresence({ cursor: current });
    },
    [],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  return (
    <main className="relative h-full w-full touch-none bg-neutral-100">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <svg
        className="h-screen w-screen"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
