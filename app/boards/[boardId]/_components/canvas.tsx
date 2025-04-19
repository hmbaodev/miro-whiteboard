"use client";

import { useState, useCallback } from "react";
import { nanoid } from "nanoid";
import {
  useHistory,
  useCanUndo,
  useCanRedo,
  useMutation,
  useStorage,
} from "@liveblocks/react";
import { LiveObject } from "@liveblocks/node";

import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/types/canvas";
import Info from "./info";
import Participants from "./participants";
import Toolbar from "./toolbar";
import CursorsPresence from "./cursors-presence";
import LayerPreview from "./layer-preview";
import { pointerEventToCanvasPoint } from "@/lib/utils";

const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  /** ON WHEEL */
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

  /** INSERT LAYER */
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Note
        | LayerType.Rectangle
        | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        width: 100,
        height: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor],
  );

  /** POINTER MOVE HANDLER */
  const onPointerMove = useMutation(
    ({ setMyPresence }, ev: React.PointerEvent) => {
      ev.preventDefault();

      const current = pointerEventToCanvasPoint(ev, camera);
      setMyPresence({ cursor: current });
    },
    [],
  );

  /** POINTER LEAVE HANDLER */
  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  /** POINTER UP HANDLER */
  const onPointerUp = useMutation(
    ({}, ev: React.PointerEvent) => {
      const point = pointerEventToCanvasPoint(ev, camera);

      // console.log({
      //   point,
      //   mode: canvasState.mode,
      // });

      if (canvasState.mode === CanvasMode.Inserting) {
        if (
          canvasState.layerType === LayerType.Ellipse ||
          canvasState.layerType === LayerType.Rectangle ||
          canvasState.layerType === LayerType.Text ||
          canvasState.layerType === LayerType.Note
        ) {
          insertLayer(canvasState.layerType, point);
        } else {
          setCanvasState({ mode: CanvasMode.None });
        }
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer],
  );

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
        onPointerUp={onPointerUp}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds?.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor="#000000"
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
